import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

@Get('by-course/:courseId')
getStudentsByCourse(@Param('courseId') courseId: string) {
  return this.studentsService.getStudentsWithAverageByCourse(Number(courseId));
}
}
