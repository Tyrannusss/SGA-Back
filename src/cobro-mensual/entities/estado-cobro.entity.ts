import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CobroMensual } from "./cobro-mensual.entity";
import { Liquidacion } from "../../liquidaciones/entities/liquidacione.entity";

@Entity('estados_cobro')
export class EstadoCobro {
  @PrimaryGeneratedColumn()

  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => CobroMensual, cobroMensual => cobroMensual.estadocobro)
  cobroMensual: CobroMensual[];

  @OneToMany(() => Liquidacion, (l) => l.cobro)
  liquidaciones: Liquidacion[];
}