import { ArrayUnique, IsArray, IsOptional, IsString } from 'class-validator';

export class OwnersAssignmentDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  ownerIds!: string[];
}
