import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FileType } from '../../common/enums/file-type.enum';

export class UploadFileBodyDto {
  @IsOptional()
  @IsString()
  @IsEnum(FileType, {
    message: `type must be one of: ${Object.values(FileType).join(', ')}`,
  })
  type?: FileType;

  @IsOptional()
  @IsString()
  originalName?: string;
}
