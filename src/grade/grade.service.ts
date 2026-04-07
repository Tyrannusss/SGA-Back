import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
  ) {}

  // CREATE / UPDATE
  async saveGrades(data: any) {
    const { courseId, fecha, grades } = data;

    let created = 0;
    let updated = 0;
console.log("data",data)
for (const grade of grades) {
  const existing = await this.gradeRepository.findOne({
    where: {
      student_id: grade.student_id,
      course_id: courseId,
      tipo_evaluacion: grade.tipo_evaluacion,
      fecha,
    },
  });

  if (existing) {
    //  UPDATE
    const update={...existing,calificacion:grade.calificacion}
    console.log(update)
    existing.calificacion = grade.calificacion;
    await this.gradeRepository.save(update);
  } else {
    //  INSERT
    const newGrade = this.gradeRepository.create({
      student_id: grade.student_id,
      course_id: courseId,
      tipo_evaluacion: grade.tipo_evaluacion,
      calificacion: grade.calificacion,
      fecha,
    });

    await this.gradeRepository.save(newGrade);
  }
}
    

    return {
      message:
        created > 0 && updated > 0
          ? 'Calificaciones actualizadas y nuevas guardadas correctamente'
          : created > 0
          ? 'Calificaciones guardadas correctamente'
          : 'Calificaciones actualizadas correctamente',
    };
  }
  //  GET por curso
  async getGradesByCourse(courseId: number) {
    const grades = await this.gradeRepository.find({
      where: { course_id: courseId },
      relations: ['student', 'student.user'],
    });

    const grouped = Object.values(
      grades.reduce((acc, g) => {
        const id = g.student.id_student;

        if (!acc[id]) {
          acc[id] = {
            student_id: id,
            nombre: `${g.student.user?.primer_nombre ?? ''} ${g.student.user?.primer_apellido ?? ''}`,
            evaluaciones: [],
            promedio: 0,
          };
        }

        acc[id].evaluaciones.push({
          tipo: g.tipo_evaluacion,
          calificacion: Number(g.calificacion),
          nota_maxima: Number(g.nota_maxima),
          fecha: g.fecha,
        });

        return acc;
      }, {} as any)
    );

    //  PROMEDIO (escala 0-10)
    grouped.forEach((s: any) => {
      const total = s.evaluaciones.reduce(
        (sum, e) => sum + (e.calificacion / e.nota_maxima) * 10,
        0
      );

      s.promedio = s.evaluaciones.length
        ? Number((total / s.evaluaciones.length).toFixed(2))
        : 0;
    });

    return grouped;
  }

  //  GET por curso y fecha
  async getGradesByCourseAndDate(courseId: number, fecha: string) {
    return this.gradeRepository.find({
      where: {
        course_id: courseId,
        fecha: new Date(fecha),
      },
    });
  }
}