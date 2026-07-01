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
import { PaginationDto } from '../common';
import {
  CreateAssignmentDto,
  OwnersAssignmentDto,
  UpdateAssignmentDto,
} from './dto';
import { NatsClientService } from '../transports/nats-client.service';

@Controller('assignments')
export class AssignmentController {
  constructor(private readonly clientService: NatsClientService) {}

  @Post()
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.clientService.send('assignment.create', createAssignmentDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.clientService.send('assignment.findAll', paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.send('assignment.findOne', id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    const payload = { ...updateAssignmentDto, id };
    return this.clientService.send('assignment.update', payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.send('assignment.remove', id);
  }

  @Patch('admins/:id')
  updateOwners(
    @Param('id') id: string,
    @Body() ownersAssignmentDto: OwnersAssignmentDto,
  ) {
    const payload = { ...ownersAssignmentDto, id };
    return this.clientService.send('assignment.update.admins', payload);
  }

  @Get('userId/:id')
  findAssignmentByUser(@Param('id') id: string) {
    return this.clientService.send('assignment.findByUser', id);
  }
}
