import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { NatsModule } from '../transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [GroupsController],
})
export class GroupsModule {}
