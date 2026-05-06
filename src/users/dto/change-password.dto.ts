import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString({ message: 'currentPassword must be a string' })
  @IsNotEmpty({ message: 'currentPassword should not be empty' })
  currentPassword!: string;

  @IsString({ message: 'newPassword must be a string' })
  @IsNotEmpty({ message: 'newPassword should not be empty' })
  @MinLength(8, { message: 'newPassword must be at least 8 characters long' })
  newPassword!: string;
}
