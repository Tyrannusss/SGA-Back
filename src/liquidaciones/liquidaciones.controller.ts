import { Controller, Get, Param } from '@nestjs/common';
import { LiquidacionesService } from './liquidaciones.service';

@Controller('liquidaciones')
export class LiquidacionesController {
  constructor(
    private readonly liquidacionesService: LiquidacionesService,
  ) {}

  // para estudiante
  @Get('student/:id/summary')
  getStudentSummary(@Param('id') id: string) {
    return this.liquidacionesService.getStudentPayments(Number(id));
  }
}