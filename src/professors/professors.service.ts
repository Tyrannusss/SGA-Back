import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Professor } from './entities/professor.entity';
import { Course } from '../courses/entities/course.entity';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class ProfessorsService {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,

    @InjectRepository(Course)
    private courseRepository: Repository<Course>, 

        @InjectRepository(User)
    private userRepository: Repository<User>,

    private dataSource: DataSource,
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

  async create(dto: CreateProfessorDto) {
    return await this.dataSource.transaction(async (manager) => {

      // 1. USER
      const user = manager.create(User, {
        cedula: dto.cedula,
        primer_nombre: dto.primer_nombre,
        segundo_nombre: dto.segundo_nombre,
        primer_apellido: dto.primer_apellido,
        segundo_apellido: dto.segundo_apellido,
        email: dto.email,
        email_secundario: dto.email_secundario,
        telefono: dto.telefono,
        password_hash: dto.password_hash || 'default123',
        role: 2, // profesor
      });

      const savedUser = await manager.save(user);

      // 2. PROFESSOR
      const professor = manager.create(Professor, {
        id_professor: savedUser.id_user,
        fecha_entrada: dto.fecha_entrada,
        correo_institucional: dto.correo_institucional,
        encuesta_url: dto.encuesta_url,
        puesto_id: dto.puesto_id,
        area_id: dto.area_id,
        estado_laboral_id: dto.estado_laboral_id,
      });

      await manager.save(professor);

      return {
        message: 'Profesor creado correctamente',
        id: savedUser.id_user,
      };
    });
  }
}