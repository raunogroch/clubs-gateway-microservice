import { IsString, IsNotEmpty, IsBase64, IsOptional } from 'class-validator';

export class UploadDniDto {
  @IsString({ message: 'userId debe ser un string' })
  @IsNotEmpty({ message: 'userId es requerido' })
  userId!: string;

  @IsString({ message: 'pdfBase64 debe ser un string' })
  @IsNotEmpty({ message: 'pdfBase64 es requerido' })
  @IsBase64()
  pdfBase64!: string;

  @IsOptional()
  @IsString()
  originalName?: string;
}
