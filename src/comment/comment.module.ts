import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Professor } from '../professors/entities/professor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorsModule } from './../professors/professors.module';
import { Comment } from './entities/comment.entity';
import { Student } from './../students/entities/student.entity';
import { StudentsModule } from './../students/students.module';



@Module({
  imports: [forwardRef(() => ProfessorsModule),forwardRef(() => StudentsModule),
  TypeOrmModule.forFeature([ Comment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
