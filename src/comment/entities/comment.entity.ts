import { Course } from 'src/courses/entities/course.entity';
import { Professor } from '../../professors/entities/professor.entity';
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


@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn({ name: 'id_comment' })
  id_comment: number;

  @ManyToOne(() => Student, student => student.comments)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Professor, professor => professor.comments)
  @JoinColumn({ name: 'professor_id' })
  professor: Professor;

  @Column({ type: 'datetime'})
  fecha: Date;

  @Column({ name: 'texto', type: 'text' })
  texto: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Course, (course) => course.comments, { eager: true })
  @JoinColumn({ name: 'course_id' })
  course: Course;

}