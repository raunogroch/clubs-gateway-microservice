import { IsString, IsNotEmpty, IsBase64, Matches } from 'class-validator';

export class UploadImageDto {
  @IsString()
  @IsNotEmpty()
  image!: string;
}
