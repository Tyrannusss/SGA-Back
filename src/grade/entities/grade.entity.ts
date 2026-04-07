import { Student } from '../../students/entities/student.entity';
import { Course } from '../../courses/entities/course.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('grades')
export class Grade {
  @PrimaryGeneratedColumn({ name: 'id_grade' })
  id_grade: number;

  
  @ManyToOne(() => Student, student => student.grades)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column()
  student_id: number;

  
  @ManyToOne(() => Course, course => course.enrollments)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column()
  course_id: number;

  @Column({ type: 'varchar', length: 50 })
  tipo_evaluacion: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  calificacion: number;

  
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 100 })
  nota_maxima: number;

  
  @Column({ type: 'text', nullable: true })
  comentarios: string;

  
  @Column({ type: 'date' })
  fecha: Date;

  
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}