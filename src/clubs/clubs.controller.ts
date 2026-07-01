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
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { PaginationDto } from '../common';
import { NatsClientService } from '../transports/nats-client.service';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clientService: NatsClientService) {}

  @Post()
  create(@Body() createClubDto: CreateClubDto) {
    return this.clientService.send('club.create', createClubDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.clientService.send('club.findAll', paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.send('club.findOne', id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClubDto: UpdateClubDto) {
    return this.clientService.send('club.update', { ...updateClubDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.send('club.remove', id);
  }
}
