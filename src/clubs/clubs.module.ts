import { Module } from '@nestjs/common';
import { ClubsController } from './clubs.controller';
import { NatsModule } from '../transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [ClubsController],
  providers: [],
})
export class ClubsModule {}
