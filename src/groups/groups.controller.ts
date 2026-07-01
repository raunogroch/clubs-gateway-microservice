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
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PaginationDto } from '../common/dto/groupPagination.dto';
import { NatsClientService } from '../transports/nats-client.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly clientService: NatsClientService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.clientService.send('group.create', createGroupDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.clientService.send('group.findAll', paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.send('group.findOne', id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.clientService.send('group.update', {
      ...updateGroupDto,
      id,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.send('group.remove', id);
  }
}
