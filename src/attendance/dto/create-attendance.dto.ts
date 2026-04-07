
export class CreateAttendanceDto {
  courseId: number;
  fecha: Date;

  attendance: {
    student_id: number;
    status: 'Presente' | 'Ausente' | 'Notificado';
  }[];
}