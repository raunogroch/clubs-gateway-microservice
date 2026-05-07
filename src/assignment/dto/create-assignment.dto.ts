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
  name!: String;

  @IsNotEmpty()
  @IsArray()
  admins!: String[];

  @IsNotEmpty()
  @IsArray()
  clubs!: String[];

  @IsEnum(AssignmentStatus, {
    message: `Status must be a valid ${Object.values(AssignmentStatus).join(', ')}`,
  })
  @IsOptional()
  status!: AssignmentStatus;

  @IsBoolean()
  @IsOptional()
  available!: Boolean;
}
