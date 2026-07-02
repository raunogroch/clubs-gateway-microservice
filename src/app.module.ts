import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AssignmentModule } from './assignment/assignment.module';
import { ClubsModule } from './clubs/clubs.module';
import { GroupsModule } from './groups/groups.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AssignmentModule,
    ClubsModule,
    GroupsModule,
    StorageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
