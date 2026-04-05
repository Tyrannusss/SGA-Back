import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  // 🔹 Obtener todos los cursos
  findAll() {
    return this.courseRepository.find({
      relations: ['professor'],
    });
  }

  // 🔹 Obtener curso por ID
  findOne(id: number) {
    return this.courseRepository.findOne({
      where: { id_course: id },
      relations: ['professor'],
    });
  }

  // 🔹 Crear curso
  create(data: Partial<Course>) {
    const course = this.courseRepository.create(data);
    return this.courseRepository.save(course);
  }

  // 🔹 Actualizar curso
  async update(id: number, data: Partial<Course>) {
    await this.courseRepository.update(id, data);
    return this.findOne(id);
  }

  // 🔹 Eliminar curso
  async remove(id: number) {
    return this.courseRepository.delete(id);
  }
}