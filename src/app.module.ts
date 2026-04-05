import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { ProfessorsModule } from './professors/professors.module';
import { StudentsModule } from './students/students.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { AttendanceModule } from './attendance/attendance.module';
import { GradeModule } from './grade/grade.module';
import { CobroMensualModule } from './cobro-mensual/cobro-mensual.module';
import { CommentModule } from './comment/comment.module';
import { StudentMovementModule } from './student-movement/student-movement.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mariadb', // o mysql
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false, // true solo en desarrollo
      }),
    }),

    UsersModule,

    AuthModule,

    CoursesModule,

    ProfessorsModule,

    StudentsModule,

    EnrollmentsModule,

    AttendanceModule,

    GradeModule,

    CobroMensualModule,

    CommentModule,

    StudentMovementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
