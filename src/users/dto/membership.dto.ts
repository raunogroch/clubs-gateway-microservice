import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { Roles, MembershipStatus } from '../../enum';

export class MembershipDto {
  // assignmentId es requerido solo para roles que no sean SUPER_ADMIN o ADMIN
  @ValidateIf(
    (obj) => obj.role && ![Roles.SUPER_ADMIN, Roles.ADMIN].includes(obj.role),
  )
  @IsString({ message: 'assignmentId must be a string' })
  @IsNotEmpty({ message: 'assignmentId is required for this role' })
  assignmentId?: string;

  @IsEnum(Roles, {
    message: `Role must be one of: ${Object.values(Roles).join(', ')}`,
  })
  @IsNotEmpty({ message: 'role is required' })
  role!: Roles;

  @IsOptional()
  @IsEnum(MembershipStatus, {
    message: `Status must be one of: ${Object.values(MembershipStatus).join(', ')}`,
  })
  status?: MembershipStatus;
}
