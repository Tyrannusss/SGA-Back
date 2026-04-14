import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LiquidacionesService } from './liquidaciones.service';
import { LiquidacionesController } from './liquidaciones.controller';
import { Liquidacion } from './entities/liquidacione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Liquidacion])],
  controllers: [LiquidacionesController],
  providers: [LiquidacionesService],
})
export class LiquidacionesModule {}