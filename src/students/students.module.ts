import { forwardRef, Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { CommentModule } from './../comment/comment.module';
import { EnrollmentsModule } from './../enrollments/enrollments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { AttendanceModule } from './../attendance/attendance.module';
import { GradeModule } from './../grade/grade.module';
import { CobroMensualModule } from './../cobro-mensual/cobro-mensual.module';
import { StudentMovementModule } from './../student-movement/student-movement.module';

@Module({
  imports: [
    forwardRef(() => CommentModule),
    forwardRef(() => EnrollmentsModule), forwardRef(() => AttendanceModule), 
    forwardRef(() => StudentMovementModule), forwardRef(() => GradeModule), forwardRef(() => CobroMensualModule),
    TypeOrmModule.forFeature([
      Student,
    ]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
