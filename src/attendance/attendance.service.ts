import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AttendanceService {
  constructor(


    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}
async createOrUpdateAttendance(dto: CreateAttendanceDto) {
  const { courseId, fecha, attendance } = dto;

  const mapStatus: Record<
    'Presente' | 'Ausente' | 'Notificado',
    'presente' | 'ausente' | 'justificado'
  > = {
    Presente: 'presente',
    Ausente: 'ausente',
    Notificado: 'justificado',
  };

  for (const a of attendance) {
    const existing = await this.attendanceRepository.findOne({
      where: {
        student: { id_student: a.student_id },
        course: { id_course: courseId },
        fecha: fecha,
      },
    });

    if (existing) {
      // 🔄 UPDATE
      existing.estado = mapStatus[a.status];
      await this.attendanceRepository.save(existing);
    } else {
      // ➕ INSERT
      const record = this.attendanceRepository.create({
        student: { id_student: a.student_id } as any,
        course: { id_course: courseId } as any,
        fecha: fecha,
        estado: mapStatus[a.status],
      });

      await this.attendanceRepository.save(record);
    }
  }

  return { message: 'Asistencia actualizada correctamente' };
}
}
