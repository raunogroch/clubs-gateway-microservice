import { Module } from '@nestjs/common';
import { AssignmentController } from './assignment.controller';
import { NatsModule } from '../transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [AssignmentController],
  providers: [],
})
export class AssignmentModule {}
