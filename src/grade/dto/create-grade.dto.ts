// dto/create-grade.dto.ts
export class CreateGradeDto {
  courseId: number;
  fecha: string;

  grades: {
    student_id: number;
    tipo_evaluacion: string;
    calificacion: number;
    nota_maxima?: number;
    comentarios?: string;
  }[];
}