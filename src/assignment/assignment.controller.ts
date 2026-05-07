import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Injectable,
  Inject,
  Query,
} from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { NATS_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common';
import { catchError } from 'rxjs';

@Controller('assignment')
export class AssignmentController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.client.send('assignment.create', createAssignmentDto).pipe(
      catchError((err) => {
        throw new RpcException(err.message);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send('assignment.findAll', paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err.message);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('assignment.findOne', id).pipe(
      catchError((err) => {
        throw new RpcException(err.message);
      }),
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    return this.client.send('assignment.update', updateAssignmentDto).pipe(
      catchError((err) => {
        throw new RpcException(err.message);
      }),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('assignment.remove', id).pipe(
      catchError((err) => {
        throw new RpcException(err.message);
      }),
    );
  }
}
