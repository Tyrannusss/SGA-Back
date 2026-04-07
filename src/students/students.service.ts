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

    // 🔥 AQUÍ EL FILTRO IMPORTANTE
    .where('enrollment.course_id = :courseId', { courseId })

    .groupBy('student.id_student')
    .addGroupBy('user.primer_nombre')
    .addGroupBy('user.segundo_nombre')
    .addGroupBy('user.primer_apellido')
    .addGroupBy('user.segundo_apellido')
    .addGroupBy('enrollment.course_id')

    .getRawMany();
}
}
