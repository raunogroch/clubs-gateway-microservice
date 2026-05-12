import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NatsModule } from './transports/nats.module';
import { AssignmentModule } from './assignment/assignment.module';
import { ClubsModule } from './clubs/clubs.module';

@Module({
  imports: [AuthModule, UsersModule, AssignmentModule, ClubsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
