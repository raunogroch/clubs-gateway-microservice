import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Status } from '../../enum';

export class UpdateStatusDto {
  @IsString({ message: 'status debe ser un string' })
  @IsEnum(Status, {
    message: `status debe ser uno de los siguientes valores: ${Object.values(Status).join(', ')}`,
  })
  @IsNotEmpty({ message: 'status es requerido' })
  status!: Status;
}
