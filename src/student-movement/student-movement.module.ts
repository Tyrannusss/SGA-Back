import { forwardRef, Module } from '@nestjs/common';
import { StudentMovementService } from './student-movement.service';
import { StudentMovementController } from './student-movement.controller';
import { StudentMovement } from './entities/student-movement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './../students/students.module';

@Module({   imports: [forwardRef(() => StudentsModule),
  TypeOrmModule.forFeature([StudentMovement])],
  controllers: [StudentMovementController],
  providers: [StudentMovementService],
})
export class StudentMovementModule {}
