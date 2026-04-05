
import { Enrollment } from "../../enrollments/entities/enrollment.entity";
import { Professor } from "../../professors/entities/professor.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn()
  id_course: number;

  @Column({ length: 10, unique: true })
  course_code: string;

  @Column({ length: 10, nullable: true })
  nivel: string;

  @Column({ length: 100, nullable: true })
  nombre: string;

  @Column({ type: "text", nullable: true })
  descripcion: string;

  @Column()
  professor_id: number;

  @Column({ type: "date", nullable: true })
  fecha_inicio: Date;

  @Column({ type: "boolean", default: true })
  activo: boolean;

  @Column({ type: "int", default: 0 })
  cantidad_estudiantes: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  tipo_curso_id: number;

  @ManyToOne(() => Professor, professor => professor.courses)
@JoinColumn({ name: "professor_id" })
professor: Professor;

@OneToMany(() => Enrollment, enrollment => enrollment.course)
enrollments: Enrollment[];

}