import { Course } from '../../courses/entities/course.entity';
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

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn({ name: 'id_enrollment' })
  id_enrollment: number;

  @ManyToOne(() => Student, student => student.enrollments)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column()
  course_id: number;

  @Column({ type: 'date' })
  fecha_inscripcion: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Course, course => course.enrollments)
  @JoinColumn({ name: 'course_id' })
  course: Course;
}