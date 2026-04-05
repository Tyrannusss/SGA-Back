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

  // 🔹 contenido del comentario
  @Column({ type: 'text' })
  comentario: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}