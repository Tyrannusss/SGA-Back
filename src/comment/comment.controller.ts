import { Controller, Get, Post, Body, Param, UseGuards, Req, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comment.service';

@Controller('comments')
@UseGuards(AuthGuard('jwt'))
export class CommentController {
  constructor(private readonly commentsService: CommentService) {}

@Post()
@UseGuards(AuthGuard('jwt'))
create(
  @Body() dto: CreateCommentDto,
  @Request() req
) {
  const professorId = req.user.id; // 👈 sale del JWT

  return this.commentsService.create(dto, professorId);
}

  @Get('course/:courseId')
  findByCourse(@Param('courseId') courseId: string) {
    return this.commentsService.findByCourse(Number(courseId));
  }
}