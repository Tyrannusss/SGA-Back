import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {

  constructor(


    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}
  
  async getStudentsWithAverageByCourse(courseId: number) {
  return await this.studentRepository
    .createQueryBuilder('student')

    .leftJoin('student.user', 'user')
    .leftJoin('student.grades', 'grade')
    .leftJoin('student.enrollments', 'enrollment')

    .select([
      'student.id_student AS id_student',
      'user.primer_nombre AS primer_nombre',
      'user.segundo_nombre AS segundo_nombre',
      'user.primer_apellido AS primer_apellido',
      'user.segundo_apellido AS segundo_apellido',
      'enrollment.course_id AS course_id',
      'COALESCE(AVG(grade.calificacion), 0) AS promedio_general'
    ])

    .where('enrollment.course_id = :courseId', { courseId })

    .groupBy('student.id_student')
    .addGroupBy('user.primer_nombre')
    .addGroupBy('user.segundo_nombre')
    .addGroupBy('user.primer_apellido')
    .addGroupBy('user.segundo_apellido')
    .addGroupBy('enrollment.course_id')

    .getRawMany();
}

async getStudentsFullInfo() {
  return await this.studentRepository
    .createQueryBuilder('student')

    // relaciones
    .leftJoin('student.user', 'user')
    .leftJoin('student.enrollments', 'enrollment')
    .leftJoin('enrollment.course', 'course')
    .leftJoin('student.attendances', 'attendance')
    .leftJoin('student.cobros', 'cobro').leftJoin(
  'estados_cobro',
  'estadoCobro',
  'estadoCobro.id_estado = cobro.estado_id'
)
    // selección
.select([
  'student.id_student AS id_student',

  `TRIM(CONCAT(
  user.primer_nombre, ' ',
  IF(user.segundo_nombre IS NOT NULL AND user.segundo_nombre != '', CONCAT(user.segundo_nombre, ' '), ''),
  user.primer_apellido, ' ',
  COALESCE(user.segundo_apellido, '')
)) AS nombre_completo`,

  'GROUP_CONCAT(DISTINCT course.course_code) AS cursos', // cambiar el id_course por nombre cuanto se tengan los nombres de los cursos

  `COALESCE(
    SUM(CASE WHEN attendance.estado = 'presente' THEN 1 ELSE 0 END) 
    / NULLIF(COUNT(DISTINCT attendance.id_attendance), 0),
  0) AS promedio_asistencia`,

  'MAX(cobro.estado_id) AS estado_cobro', 
])
    .groupBy('student.id_student')
    .addGroupBy('user.primer_nombre')
    .addGroupBy('user.segundo_nombre')
    .addGroupBy('user.primer_apellido')
    .addGroupBy('user.segundo_apellido')

    .getRawMany();
}
}
