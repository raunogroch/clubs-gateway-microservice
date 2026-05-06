import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from '../config';
import { UpdateStatusDto, UploadDniDto, UploadImageDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.client.send('users.create', createUserDto);
  }

  @Get()
  findAll() {
    return this.client.send('users.find_all', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('users.find_one', { id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.client.send('users.update', { ...updateUserDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('users.delete', { id });
  }

  @Patch('upload-image/:userId')
  uploadImage(
    @Param('userId') userId: string,
    @Body() uploadImageDto: UploadImageDto,
  ) {
    return this.client.send('users.upload_image', {
      ...uploadImageDto,
      userId,
    });
  }

  @Patch('upload-dni/:userId')
  uploadDni(
    @Param('userId') userId: string,
    @Body() uploadDniDto: UploadDniDto,
  ) {
    return this.client.send('users.upload_dni', { ...uploadDniDto, userId });
  }

  @Patch('update-status/:userId')
  changeStatus(
    @Param('userId') userId: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.client.send('users.update_status', {
      ...updateStatusDto,
      userId,
    });
  }
}
