import { Controller, Get, UseGuards, Request, Param } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('professors')
export class ProfessorsController {
  constructor(private readonly professorsService: ProfessorsService) {}

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