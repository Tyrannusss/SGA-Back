import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

    @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }
  
@Get('by-course/:courseId')
getStudentsByCourse(@Param('courseId') courseId: string) {
  return this.studentsService.getStudentsWithAverageByCourse(Number(courseId));
}

@Get('full-info')
getFullInfo() {
  return this.studentsService.getStudentsFullInfo();
}

  @Get(':id/full-detail')
  async getStudentDetail(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.studentsService.getStudentDetail(id);
  }
}
