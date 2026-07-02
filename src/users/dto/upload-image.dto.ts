import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Matches,
  IsEnum,
} from 'class-validator';
import { FileType } from '../../common/enums/file-type.enum';

export class UploadImageDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^data:image\/(jpeg|jpg|png|webp);base64,/, {
    message: 'image must be a base64 data URI for an image',
  })
  image!: string;

  @IsOptional()
  @IsString()
  originalName?: string;

  @IsOptional()
  @IsEnum(FileType)
  type?: FileType;
}
