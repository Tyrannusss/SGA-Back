import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Course } from './entities/course.entity';
import { Professor } from '../professors/entities/professor.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,

    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
  ) {}

  // 🔹 GET ALL
  async findAll() {
    const courses = await this.courseRepository.find({
    relations: ['professor', 'professor.user'],
    });

    // 🔥 formateo para frontend
    return courses.map((c) => ({
      id: c.id_course,
      nombre: c.nombre,
      grado: c.course_code,
      nivel: c.nivel,
      profesor: c.professor?.user
        ? `${c.professor.user.primer_nombre} ${c.professor.user.primer_apellido}`
        : 'Sin asignar',
      estudiantes: c.cantidad_estudiantes ?? c.enrollments?.length ?? 0,
      activo: c.activo,
    }));
  }

  // 🔹 GET ONE
  async findOne(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id_course: id },
      relations: ['professor', 'enrollments'],
    });

    if (!course) {
      throw new NotFoundException('Curso no encontrado');
    }

    return course;
  }

  // 🔹 CREATE
  async create(data: any) {
    let professor = null;

    if (data.professor_id) {
      professor = await this.professorRepository.findOne({
        where: { id_professor: data.professor_id },
      });

      if (!professor) {
        throw new NotFoundException('Profesor no encontrado');
      }
    }

    const course = this.courseRepository.create({
      course_code: data.course_code,
      nombre: data.nombre,
      nivel: data.nivel,
      descripcion: data.descripcion,
      fecha_inicio: data.fecha_inicio,
      tipo_curso_id: data.tipo_curso_id,
      professor_id: professor?.id_professor,
      professor: professor || null,
    });

    return await this.courseRepository.save(course);
  }

  // 🔹 UPDATE
  async update(id: number, data: any) {
    const course = await this.findOne(id);

    if (data.professor_id) {
      const professor = await this.professorRepository.findOne({
        where: { id_professor: data.professor_id },
      });

      if (!professor) {
        throw new NotFoundException('Profesor no encontrado');
      }

      course.professor = professor;
      course.professor_id = professor.id_professor;
    }

    course.course_code = data.course_code ?? course.course_code;
    course.nombre = data.nombre ?? course.nombre;
    course.nivel = data.nivel ?? course.nivel;
    course.descripcion = data.descripcion ?? course.descripcion;
    course.fecha_inicio = data.fecha_inicio ?? course.fecha_inicio;
    course.tipo_curso_id = data.tipo_curso_id ?? course.tipo_curso_id;
    course.activo = data.activo ?? course.activo;

    return await this.courseRepository.save(course);
  }

  // 🔹 DELETE
  async remove(id: number) {
    const course = await this.findOne(id);
    return await this.courseRepository.remove(course);
  }
}