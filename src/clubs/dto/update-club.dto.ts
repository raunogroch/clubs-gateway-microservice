import { PartialType } from '@nestjs/mapped-types';
import { CreateClubDto } from './create-club.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateClubDto extends PartialType(CreateClubDto) {
  @IsString()
  @IsNotEmpty()
  id!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  sport!: string;

  @IsString()
  image?: string;

  @IsNotEmpty()
  available?: boolean;
}
