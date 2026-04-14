import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

async create(dto: CreateCommentDto, professorId: number) {
  const comment = this.commentRepository.create({
    texto: dto.texto,
    student: { id_student: dto.student_id },
    course: { id_course: dto.course_id },
    professor: { id_professor: professorId }, 
  });

  return this.commentRepository.save(comment);
}

  async findByCourse(courseId: number) {
    return this.commentRepository.find({
      where: {
        course: { id_course: courseId } as any,
      },
      relations: ['student', 'professor'],
      order: {
        created_at: 'DESC',
      },
    });
  }

  
}