import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // 🔹 GET /courses
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  // 🔹 GET /courses/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  // 🔹 POST /courses
  @Post()
  create(@Body() body: Partial<Course>) {
    return this.coursesService.create(body);
  }

  // 🔹 PATCH /courses/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<Course>) {
    return this.coursesService.update(+id, body);
  }

  // 🔹 DELETE /courses/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}