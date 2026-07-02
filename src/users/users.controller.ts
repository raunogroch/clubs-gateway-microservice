import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateStatusDto } from './dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PaginationDto } from '../common/dto/usersPagination.dto';
import { NatsClientService } from '../transports/nats-client.service';
import { UploadFileBodyDto } from './dto/upload-file-body.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly clientService: NatsClientService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.clientService.send('users.create', createUserDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.clientService.send('users.find_all', paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.send('users.find_one', { id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.clientService.send('users.update', { ...updateUserDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.send('users.delete', id);
  }

  @Patch('upload-file/:id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('id') id: string,
    @UploadedFile()
    file: { buffer?: Buffer; mimetype?: string; originalname?: string },
    @Body() body: UploadFileBodyDto,
  ) {
    if (!file?.buffer) {
      throw new BadRequestException('A file must be provided');
    }

    const mimeType = file.mimetype || 'application/octet-stream';
    const normalizedOriginalName = this.normalizeOriginalName(
      body.originalName ?? file.originalname,
      mimeType,
    );

    return this.clientService.send('storage.upload_file', {
      userId: id,
      buffer: file.buffer,
      mimeType,
      originalName: normalizedOriginalName,
      type: this.normalizeFileType(body.type ?? 'PROFILE_IMAGE'),
    });
  }

  @Patch('upload-dni/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadDni(
    @Param('id') id: string,
    @UploadedFile()
    file: { buffer?: Buffer; mimetype?: string; originalname?: string },
    @Body('originalName') originalName?: string,
  ) {
    if (!file?.buffer) {
      throw new BadRequestException('A file must be provided');
    }

    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Only PDF files are allowed');
    }

    const normalizedOriginalName = this.normalizeOriginalName(
      originalName ?? file.originalname,
      'application/pdf',
    );

    return this.clientService.send('storage.upload_file', {
      userId: id,
      buffer: file.buffer,
      mimeType: 'application/pdf',
      originalName: normalizedOriginalName,
      type: 'DNI_PDF',
    });
  }

  private normalizeOriginalName(
    originalName: string | undefined,
    mimeType: string,
  ): string {
    const fallbackExtension = mimeType === 'application/pdf' ? 'pdf' : 'bin';
    const value = originalName?.trim();

    if (!value) {
      return `file.${fallbackExtension}`;
    }

    return value.includes('.') ? value : `${value}.${fallbackExtension}`;
  }

  private normalizeFileType(type: string): string {
    const normalized = type?.trim().toUpperCase();

    switch (normalized) {
      case 'PROFILE_IMAGE':
      case 'DNI_PDF':
      case 'MEDICAL_RECORD':
      case 'CONTRACT':
      case 'OTHER':
        return normalized;
      default:
        return 'PROFILE_IMAGE';
    }
  }

  @Patch('update-status/:id')
  changeStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.clientService.send('users.update_status', {
      ...updateStatusDto,
      id,
    });
  }

  @Patch('update-password/:id')
  changePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.clientService.send('users.update_password', {
      ...updatePasswordDto,
      id,
    });
  }
}
