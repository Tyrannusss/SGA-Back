import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentMovementDto } from './create-student-movement.dto';

export class UpdateStudentMovementDto extends PartialType(CreateStudentMovementDto) {}
