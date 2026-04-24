// student/dto/create-student.dto.ts

import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  primer_nombre: string;

  @IsString()
  primer_apellido: string;

  @IsString()
  cedula: string;

  @IsEmail()
  email: string;

  @IsOptional()
  telefono?: string;

  @IsOptional()
  segundo_nombre?: string;

  @IsOptional()
  segundo_apellido?: string;

  @IsOptional()
  email_secundario?: string;

  @IsOptional()
  password_hash?: string;

  // estudiante
  @IsOptional()
  mes_matricula?: string;

  @IsOptional()
  @IsNumber()
  fecha_pago_dia?: number;

  @IsOptional()
  @IsNumber()
  mensualidad_base?: number;

  @IsOptional()
  @IsNumber()
  tasa_iva?: number;

  @IsOptional()
  fecha_inicio?: Date;

  @IsOptional()
  fecha_salida?: Date;

  @IsOptional()
  @IsBoolean()
  no_contactar?: boolean;

  @IsOptional()
  correo_teams?: string;
}