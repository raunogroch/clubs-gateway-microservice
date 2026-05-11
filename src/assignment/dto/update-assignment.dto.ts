import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAssignmentDto {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;
}
