import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Professor } from './professor.entity';

@Entity('estados_laborales')
export class EstadoLaboral {
  @PrimaryGeneratedColumn({ name: 'id_estado' })
  id_estado: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @OneToMany(() => Professor, professor => professor.estadoLaboral)
  professors: Professor[];
}