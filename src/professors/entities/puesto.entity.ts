import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Professor } from './professor.entity';

@Entity('puestos')
export class Puesto {
  @PrimaryGeneratedColumn({ name: 'id_puesto' })
  id_puesto: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @OneToMany(() => Professor, professor => professor.puesto)
  professors: Professor[];
}