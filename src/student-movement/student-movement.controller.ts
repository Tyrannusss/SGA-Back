import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentMovementService } from './student-movement.service';
import { CreateStudentMovementDto } from './dto/create-student-movement.dto';
import { UpdateStudentMovementDto } from './dto/update-student-movement.dto';

@Controller('student-movement')
export class StudentMovementController {
  constructor(private readonly studentMovementService: StudentMovementService) {}

  @Post()
  create(@Body() createStudentMovementDto: CreateStudentMovementDto) {
    return this.studentMovementService.create(createStudentMovementDto);
  }

  @Get()
  findAll() {
    return this.studentMovementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentMovementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentMovementDto: UpdateStudentMovementDto) {
    return this.studentMovementService.update(+id, updateStudentMovementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentMovementService.remove(+id);
  }
}
