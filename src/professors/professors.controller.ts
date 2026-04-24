import { Controller, Get, UseGuards, Request, Param, Post, Body } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateProfessorDto } from './dto/create-professor.dto';

@Controller('professors')
export class ProfessorsController {
  constructor(private readonly professorsService: ProfessorsService) {}


  @Post()
  create(@Body() createProfessorDto: CreateProfessorDto) {
    return this.professorsService.create(createProfessorDto);
  }
  // cursos del profesor logueado
@UseGuards(AuthGuard('jwt'))
@Get('my-courses')
getMyCourses(@Request() req) {
  const professorId = req.user.id;
  return this.professorsService.getMyCourses(professorId);
}
  // perfil del profesor
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    const professorId = req.user.id;
    return this.professorsService.getProfile(professorId);
  }

  
}