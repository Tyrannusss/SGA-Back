import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CobroMensual } from "./cobro-mensual.entity";

@Entity('estados_cobro')
export class EstadoCobro {
  @PrimaryGeneratedColumn()

  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => CobroMensual, cobroMensual => cobroMensual.estadocobro)
  cobroMensual: CobroMensual[];
}