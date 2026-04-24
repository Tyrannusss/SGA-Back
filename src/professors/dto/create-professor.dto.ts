// professor/dto/create-professor.dto.ts

import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateProfessorDto {
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

  // PROFESOR
  @IsOptional()
  fecha_entrada?: Date;

  @IsOptional()
  @IsEmail()
  correo_institucional?: string;

  @IsOptional()
  encuesta_url?: string;

  @IsNumber()
  puesto_id: number;

  @IsNumber()
  area_id: number;

  @IsNumber()
  estado_laboral_id: number;
}