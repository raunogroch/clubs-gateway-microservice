import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NatsModule } from './transports/nats.module';
import { AssignmentModule } from './assignment/assignment.module';

@Module({
  imports: [AuthModule, UsersModule, AssignmentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
