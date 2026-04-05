import { Injectable } from '@nestjs/common';
import { CreateStudentMovementDto } from './dto/create-student-movement.dto';
import { UpdateStudentMovementDto } from './dto/update-student-movement.dto';

@Injectable()
export class StudentMovementService {
  create(createStudentMovementDto: CreateStudentMovementDto) {
    return 'This action adds a new studentMovement';
  }

  findAll() {
    return `This action returns all studentMovement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentMovement`;
  }

  update(id: number, updateStudentMovementDto: UpdateStudentMovementDto) {
    return `This action updates a #${id} studentMovement`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentMovement`;
  }
}
