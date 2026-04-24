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
@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  // 🔹 GET /courses
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  // 🔹 GET /courses/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  // 🔹 POST /courses
  @Post()
  create(@Body() body: any) {
    return this.courseService.create(body);
  }

  // 🔹 PATCH /courses/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.courseService.update(+id, body);
  }

  // 🔹 DELETE /courses/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}