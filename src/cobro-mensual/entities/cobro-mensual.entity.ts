import { Student } from '../../students/entities/student.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  IntegerType,
} from 'typeorm';
import { EstadoCobro } from './estado-cobro';

@Entity('cobros_mensuales')
export class CobroMensual {
  @PrimaryGeneratedColumn({ name: 'id_cobro' })
  id_cobro: number;

  @ManyToOne(() => Student, student => student.cobros)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({ type: 'date' })
  fecha_pago: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

@ManyToOne(() => EstadoCobro, estado => estado.cobroMensual)
@JoinColumn({ name: 'estado_id' })
estadocobro: EstadoCobro;
}