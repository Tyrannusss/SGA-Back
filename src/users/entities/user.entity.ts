import { Professor } from 'src/professors/entities/professor.entity';
import { Student } from 'src/students/entities/student.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  cedula: string;

  @Column({ type: 'varchar', length: 100 })
  primer_nombre: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  segundo_nombre?: string;

  @Column({ type: 'varchar', length: 100 })
  primer_apellido: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  segundo_apellido?: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  email_secundario?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono?: string;

  @Column({ type: 'varchar', length: 255 })
  password_hash: string;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  activo: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at?: Date;

  @Column({ type: 'int', nullable: true })
  role?: number;

  @OneToOne(() => Student, (student) => student.user)
student: Student;

@OneToOne(() => Professor, (professor) => professor.user)
professor: Professor;
}