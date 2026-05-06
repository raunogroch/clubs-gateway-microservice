import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Gender, Status } from '../../enum';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString({ message: 'ID must be a string' })
  @IsNotEmpty({ message: 'ID should not be empty' })
  id!: string;

  @IsString({ message: 'dni must be a string' })
  @IsNotEmpty({ message: 'dni should not be empty' })
  @MinLength(6, { message: 'dni must be at least 6 characters long' })
  dni?: string;

  @IsEnum(Gender, {
    message: `gender must be a valid enum value: ${Object.values(Gender).join(', ')}`,
  })
  gender?: Gender;

  @Type(() => Date)
  @IsDate({ message: 'birth_date must be a valid date' })
  birth_date?: Date;

  @IsString()
  @MinLength(7)
  phone?: string;

  @IsEnum(Status, {
    message: `status must be a valid enum value: ${Object.values(Status).join(', ')}`,
  })
  status?: Status;

  @IsString({ message: 'image must be a string' })
  @IsOptional()
  image?: string;

  @IsString({ message: 'dni_file must be a string' })
  @IsOptional()
  dni_file?: string;

  @IsString({ message: 'address must be a string' })
  address?: string;

  @IsString({ message: 'assignment_id must be a string' })
  @IsOptional()
  assignment_id?: string;
}
