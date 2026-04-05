import { forwardRef, Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { Grade } from './entities/grade.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './../students/students.module';

@Module({    imports: [forwardRef(() => StudentsModule),
    TypeOrmModule.forFeature([Grade])],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}
