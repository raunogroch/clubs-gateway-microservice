import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CoachRoles } from '../../enum/coach-roles.enum';

export class AddCoachDto {
  @IsString({ message: 'coachId must be a string' })
  @IsNotEmpty({ message: 'coachId should not be empty' })
  @IsUUID('4', { message: 'coachId must be a valid UUID' })
  coachId!: string;

  @IsEnum(CoachRoles, {
    message: `role must be a valid enum value: ${Object.values(CoachRoles).join(', ')}`,
  })
  @IsNotEmpty({ message: 'role should not be empty' })
  role!: CoachRoles;
}
