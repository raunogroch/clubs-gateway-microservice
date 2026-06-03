import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from '../config';
import { UpdateStatusDto, UploadDniDto, UploadImageDto } from './dto';
import { catchError } from 'rxjs';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PaginationDto } from '../common/dto/usersPagination.dto';

@Controller('users')
export class UsersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.client.send('users.create', createUserDto).pipe(
      catchError((err) => {
        throw new RpcException(err.message);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send('users.find_all', paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err.message);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('users.find_one', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err.message);
      }),
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.client.send('users.update', { ...updateUserDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('users.delete', id).pipe(
      catchError((err) => {
        throw new RpcException(err.message);
      }),
    );
  }

  @Patch('upload-image/:id')
  uploadImage(@Param('id') id: string, @Body() uploadImageDto: UploadImageDto) {
    return this.client.send('users.upload_image', {
      ...uploadImageDto,
      id,
    });
  }

  @Patch('upload-dni/:id')
  uploadDni(@Param('id') id: string, @Body() uploadDniDto: UploadDniDto) {
    return this.client.send('users.upload_dni', { ...uploadDniDto, id });
  }

  @Patch('update-status/:id')
  changeStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.client.send('users.update_status', updateStatusDto).pipe(
      catchError((err) => {
        throw new RpcException(err.message);
      }),
    );
  }

  @Patch('update-password/:id')
  changePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.client.send('users.update_password', updatePasswordDto).pipe(
      catchError((err) => {
        throw new RpcException(err.message);
      }),
    );
  }
}
