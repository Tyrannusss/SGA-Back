import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Professor } from './../professors/entities/professor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course,Professor])],
  providers: [CoursesService],
  controllers: [CoursesController],
  exports: [TypeOrmModule],
})
export class CoursesModule {}