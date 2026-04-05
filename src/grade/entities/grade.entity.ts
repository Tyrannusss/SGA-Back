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


@Entity('grades')
export class Grade {
  @PrimaryGeneratedColumn({ name: 'id_grade' })
  id_grade: number;

  @ManyToOne(() => Student, student => student.grades)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column()
  course_id: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  calificacion: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  evaluacion: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}