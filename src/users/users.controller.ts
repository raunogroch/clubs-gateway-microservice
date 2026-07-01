import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateStatusDto, UploadDniDto, UploadImageDto } from './dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PaginationDto } from '../common/dto/usersPagination.dto';
import { NatsClientService } from '../transports/nats-client.service';

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

  @Patch('upload-image/:id')
  uploadImage(@Param('id') id: string, @Body() uploadImageDto: UploadImageDto) {
    return this.clientService.send('users.upload_image', {
      ...uploadImageDto,
      id,
    });
  }

  @Patch('upload-dni/:id')
  uploadDni(@Param('id') id: string, @Body() uploadDniDto: UploadDniDto) {
    return this.clientService.send('users.upload_dni', { ...uploadDniDto, id });
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
