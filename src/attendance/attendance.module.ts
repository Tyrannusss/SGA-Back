import { forwardRef, Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Attendance } from './entities/attendance.entity';
import { StudentsModule } from './../students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [forwardRef(() => StudentsModule),
    TypeOrmModule.forFeature([Attendance])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
