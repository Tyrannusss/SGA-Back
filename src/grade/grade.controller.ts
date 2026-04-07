import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { GradeService } from './grade.service';

@Controller('grades')
export class GradeController {
  constructor(private readonly gradesService: GradeService) {}

  //  Guardar / actualizar
@Post()
create(@Body() body: any) {
  return this.gradesService.saveGrades(body); // ✅ TODO el payload
}

  // Obtener por curso
  @Get('by-course/:courseId')
  getByCourse(@Param('courseId') courseId: string) {
    return this.gradesService.getGradesByCourse(Number(courseId));
  }

  // Obtener por curso y fecha 
  @Get('by-course/:courseId/date')
  getByCourseAndDate(
    @Param('courseId') courseId: string,
    @Query('fecha') fecha: string,
  ) {
    return this.gradesService.getGradesByCourseAndDate(
      Number(courseId),
      fecha,
    );
  }
}