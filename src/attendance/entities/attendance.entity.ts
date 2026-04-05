import { Student } from '../../students/entities/student.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn({ name: 'id_attendance' })
  id_attendance: number;

  @ManyToOne(() => Student, student => student.attendances)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column()
  course_id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'boolean' })
  presente: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}