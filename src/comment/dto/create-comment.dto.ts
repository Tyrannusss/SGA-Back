import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  texto: string;

  @IsNumber()
  student_id: number;

  @IsNumber()
  course_id: number;

}