import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Liquidacion } from './entities/liquidacione.entity';

@Injectable()
export class LiquidacionesService {
  constructor(
    @InjectRepository(Liquidacion)
    private readonly liquidacionRepo: Repository<Liquidacion>,
  ) {}

  async getStudentPayments(studentId: number) {
    // 🔥 Estado actual del cobro
    const estadoActual = await this.liquidacionRepo.query(
      `
      SELECT 
        cm.id_cobro,
        cm.periodo,
        cm.monto,
        ec.nombre AS estado
      FROM cobros_mensuales cm
      INNER JOIN estados_cobro ec ON ec.id_estado = cm.estado_id
      WHERE cm.student_id = ?
      ORDER BY cm.created_at DESC
      LIMIT 1
      `,
      [studentId],
    );

    // 💰 Historial de pagos
    const historial = await this.liquidacionRepo.query(
      `
      SELECT 
        l.id_liquidacion,
        l.total,
        l.monto_base,
        l.monto_iva,
        l.medio_pago,
        l.fecha_pago,
        l.factura_id,
        cm.periodo
      FROM liquidaciones l
      INNER JOIN cobros_mensuales cm ON cm.id_cobro = l.cobro_id
      WHERE l.student_id = ?
      ORDER BY l.fecha_pago DESC
      `,
      [studentId],
    );

    // ⚠️ Cobros (deudas / estados)
    const cobros = await this.liquidacionRepo.query(
      `
      SELECT 
        cm.id_cobro,
        cm.periodo,
        cm.monto,
        ec.nombre AS estado
      FROM cobros_mensuales cm
      INNER JOIN estados_cobro ec ON ec.id_estado = cm.estado_id
      WHERE cm.student_id = ?
      ORDER BY cm.periodo DESC
      `,
      [studentId],
    );

    return {
      estado_actual: estadoActual[0] || null,
      historial,
      cobros,
    };
  }
}