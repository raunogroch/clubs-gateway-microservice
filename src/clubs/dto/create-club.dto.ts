import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ClubStatus, SportType } from '../enum';

export class CreateClubDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEnum(SportType, { message: `Invalid sport type` })
  sport!: SportType;

  @IsString()
  @IsNotEmpty()
  assignmentId!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;

  @IsEnum(ClubStatus, { message: `Invalid club status` })
  @IsOptional()
  status?: ClubStatus;

  @IsBoolean()
  @IsOptional()
  available?: boolean;
}
