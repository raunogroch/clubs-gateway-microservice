import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  Header,
  Req,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { UploadFileDto } from './dto/upload-file.dto';
import { NatsClientService } from '../transports/nats-client.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly natsClient: NatsClientService) {}

  @Post('upload')
  uploadFile(@Body() uploadFileDto: UploadFileDto) {
    return this.natsClient.send('storage.upload_file', uploadFileDto);
  }

  @Get(':folderName/:filename')
  @Header('Cache-Control', 'public, max-age=31536000, immutable')
  async getFile(
    @Param('folderName') folderName: string,
    @Param('filename') filename: string,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    const file = await this.natsClient.send<{
      data?: string | Buffer;
      type?: string;
      userId?: string;
      mimeType?: string;
    }>('storage.get_file', {
      folderName,
      filename,
    });

    if (!file) {
      return response.status(404).send('File not found');
    }

    const fileResponse = file as {
      data?: string | Buffer;
      type?: string;
      userId?: string;
      mimeType?: string;
    };

    if (this.requiresAuthentication(fileResponse.type, folderName)) {
      const authHeader =
        (request.headers.authorization as string | undefined) ?? '';
      const [, token] = authHeader.split(' ');

      if (!token) {
        return response.status(401).send('No token provided');
      }

      try {
        const verified = await this.natsClient.send<{
          user?: { id?: string; role?: string };
        }>('user.auth.verify', token);

        const user = verified?.user;
        const canAccess = this.canAccessFile(
          fileResponse.type,
          user,
          fileResponse.userId,
        );

        if (!canAccess) {
          return response.status(403).send('Insufficient role to access file');
        }
      } catch {
        return response.status(401).send('Invalid token');
      }
    }

    const buffer = Buffer.isBuffer(fileResponse.data)
      ? fileResponse.data
      : Buffer.from(
          typeof fileResponse.data === 'string' ? fileResponse.data : '',
          'base64',
        );

    response.setHeader(
      'Content-Type',
      fileResponse.mimeType ?? 'application/octet-stream',
    );
    return response.send(buffer);
  }

  private requiresAuthentication(
    type: string | undefined,
    folderName: string,
  ): boolean {
    if (type === 'PROFILE_IMAGE') {
      return false;
    }

    if (folderName.toLowerCase() === 'profile_image') {
      return false;
    }

    return true;
  }

  private canAccessFile(
    type: string | undefined,
    user: { id?: string; role?: string } | undefined,
    ownerId?: string,
  ): boolean {
    if (type === 'PROFILE_IMAGE') {
      return true;
    }

    if (ownerId && user?.id && ownerId === user.id) {
      return true;
    }

    const allowedRolesByType: Record<string, string[] | null> = {
      DNI_PDF: ['SUPER_ADMIN', 'ADMIN'],
      MEDICAL_RECORD: ['SUPER_ADMIN', 'ADMIN', 'ASSISTANT', 'COACH'],
      CONTRACT: ['SUPER_ADMIN', 'ADMIN'],
      OTHER: null,
    };

    const allowedRoles = type ? (allowedRolesByType[type] ?? null) : null;
    return Array.isArray(allowedRoles)
      ? Boolean(user && allowedRoles.includes(user.role ?? ''))
      : true;
  }
}
