import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateClubDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  sport!: string;

  @IsString()
  image?: string;

  @IsBoolean()
  available?: boolean;
}
