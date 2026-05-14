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
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { NATS_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common';
import { catchError } from 'rxjs';

@Controller('clubs')
export class ClubsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createClubDto: CreateClubDto) {
    return this.client.send('club.create', createClubDto).pipe(
      catchError((err) => {
        throw new RpcException(err.message);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send('club.findAll', paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err.message);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('club.findOne', id).pipe(
      catchError((err) => {
        throw new RpcException(err.message);
      }),
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClubDto: UpdateClubDto) {
    return this.client.send('club.update', { ...updateClubDto, id }).pipe(
      catchError((err) => {
        throw new RpcException(err.message);
      }),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('club.remove', id).pipe(
      catchError((err) => {
        throw new RpcException(err.message);
      }),
    );
  }
}
