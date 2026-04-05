import {
  IsString,
  IsEmail,
  IsOptional,
  IsInt,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(20)
  cedula: string;

  @IsString()
  @MaxLength(100)
  primer_nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  segundo_nombre?: string;

  @IsString()
  @MaxLength(100)
  primer_apellido: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  segundo_apellido?: string;

  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  email_secundario?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password_hash: string;

  @IsOptional()
  @IsInt()
  activo?: boolean;

  @IsOptional()
  @IsInt()
  role?: number;
}