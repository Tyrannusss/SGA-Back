import { forwardRef, Module } from '@nestjs/common';
import { CobroMensualService } from './cobro-mensual.service';
import { CobroMensualController } from './cobro-mensual.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CobroMensual } from './entities/cobro-mensual.entity';
import { StudentsModule } from './../students/students.module';

@Module({   
  imports: [forwardRef(() => StudentsModule),
  TypeOrmModule.forFeature([CobroMensual])],
  controllers: [CobroMensualController],
  providers: [CobroMensualService],
})
export class CobroMensualModule {}
