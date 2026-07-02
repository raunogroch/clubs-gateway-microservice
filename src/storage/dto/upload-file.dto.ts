import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { FileType } from '../../common/enums/file-type.enum';

export class UploadFileDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsDefined()
  file!: {
    originalname: string;
    mimetype: string;
    buffer: Buffer;
  };

  @IsString()
  @IsNotEmpty()
  type!: FileType;
}
