import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AssignmentStatus } from '../enum/assignment-status.enum';

export class CreateAssignmentDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsArray()
  @IsOptional()
  assignmentAdmins?: string[];

  @IsArray()
  @IsOptional()
  clubs?: string[];

  @IsEnum(AssignmentStatus, {
    message: `status must be a valid ${Object.values(AssignmentStatus).join(', ')}`,
  })
  @IsOptional()
  status?: AssignmentStatus;

  @IsBoolean()
  @IsOptional()
  available?: boolean;
}
