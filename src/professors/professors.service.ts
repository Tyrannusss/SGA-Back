import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from './entities/professor.entity';
import { Course } from '../courses/entities/course.entity';


@Injectable()
export class ProfessorsService {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,

    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  //🔹 cursos del profesor
  async getMyCourses(professorId: number) {
    const courses = await this.courseRepository
      .createQueryBuilder('course')
      .leftJoin('course.professor', 'professor')
      .leftJoin('course.enrollments', 'enrollment')
      .leftJoin('enrollment.student', 'student')
      .where('professor.id_professor = :professorId', { professorId })
      .select([
        'course.id_course AS id_course',
        'course.course_code AS course_code',
        'COUNT(student.id_student) AS students_count',
      ])
      .groupBy('course.id_course')
      .getRawMany();

    return courses;
  }

  async getProfile(professorId: number) {
    return this.professorRepository.findOne({
      where: { id_professor: professorId },
      relations: ['user'],
    });
  }
}