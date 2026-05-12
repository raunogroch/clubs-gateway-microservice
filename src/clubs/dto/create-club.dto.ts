import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClubDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  sport!: string;

  @IsString()
  @IsNotEmpty()
  assignmentId!: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsBoolean()
  @IsOptional()
  available?: boolean;
}
