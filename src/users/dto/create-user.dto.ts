import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender, Roles } from '../../enum';

export class CreateUserDto {
  @IsEnum(Roles, {
    message: `role must be a valid enum value: ${Object.values(Roles).join(', ')}`,
  })
  @IsNotEmpty({ message: 'role should not be empty' })
  role!: Roles;

  @IsString({ message: 'username must be a string' })
  @IsNotEmpty({ message: 'username should not be empty' })
  username!: string;

  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'password should not be empty' })
  password!: string;

  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name should not be empty' })
  name!: string;

  @IsString({ message: 'lastname must be a string' })
  @IsNotEmpty({ message: 'lastname should not be empty' })
  lastname!: string;

  @IsString({ message: 'dni must be a string' })
  @IsNotEmpty({ message: 'dni should not be empty' })
  @MinLength(6, { message: 'dni must be at least 6 characters long' })
  dni?: string;

  @IsEnum(Gender, {
    message: `gender must be a valid enum value: ${Object.values(Gender).join(', ')}`,
  })
  gender?: Gender;
}
