import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorsService } from './professors.service';
import { ProfessorsController } from './professors.controller';
import { Professor } from './entities/professor.entity';
import { Course } from '../courses/entities/course.entity';
import { Area } from './entities/area.entity';
import { Puesto } from './entities/puesto.entity';
import { EstadoLaboral } from './entities/estado-laboral.entity';
import { CommentModule } from './../comment/comment.module';

@Module({
  imports: [
    forwardRef(() => CommentModule),
    TypeOrmModule.forFeature([Professor,Course,Area,Puesto,EstadoLaboral]),
  ],
  controllers: [ProfessorsController],
  providers: [ProfessorsService],
})
export class ProfessorsModule {}
