import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AdminsAssignmentDto {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsArray()
  @IsNotEmpty()
  admins!: string[];
}
