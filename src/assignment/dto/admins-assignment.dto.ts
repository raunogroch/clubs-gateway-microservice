import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AdminsAssignmentDto {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsArray()
  @IsString({ each: true })
  assignmentAdmins!: string[];
}
