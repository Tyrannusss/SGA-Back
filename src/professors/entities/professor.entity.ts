import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Course } from '../../courses/entities/course.entity';
import { User } from '../../users/entities/user.entity';
import { EstadoLaboral } from './estado-laboral.entity';
import { Puesto } from './puesto.entity';
import { Area } from './area.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity('professors')
export class Professor {
  @PrimaryGeneratedColumn({ name: 'id_professor' })
  id_professor: number;

  @Column({ type: 'date', nullable: true })
  fecha_entrada: Date;

  @Column({ type: 'date', nullable: true })
  fecha_salida: Date;

  @Column({ type: 'text', nullable: true })
  encuesta_url: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  correo_institucional: string;

  @Column()
  puesto_id: number;

  @Column({ nullable: true })
  area_id: number;

  @Column()
  estado_laboral_id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'id_professor', referencedColumnName: 'id_user' })
  user: User;

  @ManyToOne(() => Area, area => area.professors)
  @JoinColumn({ name: 'area_id' })
  area: Area;

  @ManyToOne(() => Puesto, puesto => puesto.professors)
  @JoinColumn({ name: 'puesto_id' })
  puesto: Puesto;

  @ManyToOne(() => EstadoLaboral, estado => estado.professors)
  @JoinColumn({ name: 'estado_laboral_id' })
  estadoLaboral: EstadoLaboral;

  @OneToMany(() => Course, course => course.professor)
  courses: Course[];

@OneToMany(() => Comment, comment => comment.professor)
comments: Comment[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}