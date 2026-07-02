import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { NatsModule } from '../transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [StorageController],
  providers: [],
})
export class StorageModule {}
