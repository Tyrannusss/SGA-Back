import { IsNotEmpty, IsOptional, IsString, IsInt, IsDateString, MaxLength } from "class-validator";

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  course_code: string;

  @IsOptional()
  @IsString()
  nivel?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNotEmpty()
  @IsInt()
  professor_id: number;

  @IsOptional()
  @IsDateString()
  fecha_inicio?: Date;

  @IsOptional()
  @IsInt()
  tipo_curso_id?: number;
}