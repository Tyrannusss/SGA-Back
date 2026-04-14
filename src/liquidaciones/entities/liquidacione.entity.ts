import { CobroMensual } from '../../cobro-mensual/entities/cobro-mensual.entity';
import { Student } from '../../students/entities/student.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('liquidaciones')
export class Liquidacion {
  @PrimaryGeneratedColumn()
  id_liquidacion: number;

  @Column()
  student_id: number;

  @Column({ nullable: true })
  cobro_id: number;

  @Column({ nullable: true })
  factura_id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  monto_base: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  monto_iva: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ nullable: true })
  medio_pago: string;

  @Column({ nullable: true })
  doc_pago: string;

  @Column({ type: 'date', nullable: true })
  fecha_pago: Date;

  @CreateDateColumn()
  created_at: Date;

  // RELATIONS

  @ManyToOne(() => Student, (student) => student.liquidaciones)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => CobroMensual, (cobro) => cobro.liquidaciones)
  @JoinColumn({ name: 'cobro_id' })
  cobro: CobroMensual;
}