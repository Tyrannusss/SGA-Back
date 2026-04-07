import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


import { User } from '../../users/entities/user.entity';
import { StudentMovement } from '../../student-movement/entities/student-movement.entity';
import { CobroMensual } from '../../cobro-mensual/entities/cobro-mensual.entity';
import { Grade } from '../../grade/entities/grade.entity';
import { Attendance } from '../../attendance/entities/attendance.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity('students')
export class Student {
  @PrimaryColumn({ name: 'id_student' })
  id_student: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'id_student', referencedColumnName: 'id_user' })
  user: User;

  @Column({ type: 'varchar', length: 50, nullable: true })
  mes_matricula: string;

  @Column({ type: 'int', nullable: true })
  fecha_pago_dia: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  mensualidad_base: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  tasa_iva: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total_mensual: number;

  @Column({ type: 'date', nullable: true })
  fecha_inicio: Date;

  @Column({ type: 'date', nullable: true })
  fecha_salida: Date;

  @Column({ type: 'boolean', default: false })
  no_contactar: boolean;

  @Column({ type: 'varchar', length: 150, nullable: true })
  correo_teams: string;

  @OneToMany(() => Enrollment, enrollment => enrollment.student)
  enrollments: Enrollment[];

  @OneToMany(() => Attendance, attendance => attendance.student)
  attendances: Attendance[];

  @OneToMany(() => Grade, grade => grade.student)
  grades: Grade[];

  @OneToMany(() => CobroMensual, cobro => cobro.student)
  cobros: CobroMensual[];

  @OneToMany(() => Comment, comment => comment.student)
  comments: Comment[];

  @OneToMany(() => StudentMovement, movement => movement.student)
  movements: StudentMovement[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}