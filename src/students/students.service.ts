import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { DataSource, Repository } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';



@Injectable()
export class StudentsService {

  constructor(
@InjectRepository(Comment)
private readonly commentsRepository: Repository<Comment>,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

        @InjectRepository(User)
    private userRepository: Repository<User>,

    private dataSource: DataSource,
  ) {}
  
  async getStudentsWithAverageByCourse(courseId: number) {
  return await this.studentRepository
    .createQueryBuilder('student')

    .leftJoin('student.user', 'user')
    .leftJoin('student.grades', 'grade')
    .leftJoin('student.enrollments', 'enrollment')

    .select([
      'student.id_student AS id_student',
      'user.primer_nombre AS primer_nombre',
      'user.segundo_nombre AS segundo_nombre',
      'user.primer_apellido AS primer_apellido',
      'user.segundo_apellido AS segundo_apellido',
      'enrollment.course_id AS course_id',
      'COALESCE(AVG(grade.calificacion), 0) AS promedio_general'
    ])

    .where('enrollment.course_id = :courseId', { courseId })

    .groupBy('student.id_student')
    .addGroupBy('user.primer_nombre')
    .addGroupBy('user.segundo_nombre')
    .addGroupBy('user.primer_apellido')
    .addGroupBy('user.segundo_apellido')
    .addGroupBy('enrollment.course_id')

    .getRawMany();
}

async getStudentsFullInfo() {
  return await this.studentRepository
    .createQueryBuilder('student')

    // relaciones
    .leftJoin('student.user', 'user')
    .leftJoin('student.enrollments', 'enrollment')
    .leftJoin('enrollment.course', 'course')
    .leftJoin('student.attendances', 'attendance')
    .leftJoin('student.cobros', 'cobro').leftJoin(
  'estados_cobro',
  'estadoCobro',
  'estadoCobro.id_estado = cobro.estado_id'
)
    // selección
.select([
  'student.id_student AS id_student',

  `TRIM(CONCAT(
  user.primer_nombre, ' ',
  IF(user.segundo_nombre IS NOT NULL AND user.segundo_nombre != '', CONCAT(user.segundo_nombre, ' '), ''),
  user.primer_apellido, ' ',
  COALESCE(user.segundo_apellido, '')
)) AS nombre_completo`,

  'GROUP_CONCAT(DISTINCT course.course_code) AS cursos', // cambiar el id_course por nombre cuanto se tengan los nombres de los cursos

  `COALESCE(
    SUM(CASE WHEN attendance.estado = 'presente' THEN 1 ELSE 0 END) 
    / NULLIF(COUNT(DISTINCT attendance.id_attendance), 0),
  0) AS promedio_asistencia`,

  'MAX(cobro.estado_id) AS estado_cobro', 
])
    .groupBy('student.id_student')
    .addGroupBy('user.primer_nombre') 
    .addGroupBy('user.segundo_nombre')
    .addGroupBy('user.primer_apellido')
    .addGroupBy('user.segundo_apellido')

    .getRawMany();
}
async getStudentDetail(studentId: number) {
  
  const result = await this.studentRepository
    .createQueryBuilder('student')

    .leftJoin('student.user', 'user')
    .leftJoin('student.enrollments', 'enrollment')
    .leftJoin('enrollment.course', 'course')
    .leftJoin('student.attendances', 'attendance')

    // 🔥 SUBQUERY PARA GRADES
.leftJoin(
  qb => {
    return qb
      .select('g.student_id', 'student_id')
      .addSelect(`
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'curso', course.course_code,
            'tipo', g.tipo_evaluacion,
            'calificacion', g.calificacion,
            'fecha', g.fecha
          )
        )
      `, 'evaluaciones')
      .addSelect(`
        AVG(g.calificacion / g.nota_maxima)
      `, 'promedio_evaluaciones')
      .from('grades', 'g')
      .leftJoin('courses', 'course', 'course.id_course = g.course_id')
      .groupBy('g.student_id');
  },
  'gradesAgg',
  'gradesAgg.student_id = student.id_student'
)

    .select([
  'student.id_student AS id_student',

  `TRIM(CONCAT(
    user.primer_nombre, ' ',
    IFNULL(user.segundo_nombre, ''), ' ',
    user.primer_apellido, ' ',
    IFNULL(user.segundo_apellido, '')
  )) AS nombre_completo`,

  `CASE 
    WHEN user.activo = 1 THEN 'Activo'
    ELSE 'Inactivo'
  END AS estado`,

  'user.email AS email',
  'user.email_secundario AS email_secundario',
  'user.telefono AS telefono',

  'GROUP_CONCAT(DISTINCT course.course_code) AS cursos',

  `COALESCE(
    SUM(CASE WHEN attendance.estado = 'presente' THEN 1 ELSE 0 END) 
    / NULLIF(COUNT(attendance.id_attendance), 0),
  0) AS promedio_asistencia`,

  'gradesAgg.evaluaciones AS evaluaciones',
  'COALESCE(gradesAgg.promedio_evaluaciones, 0) AS promedio_evaluaciones'
])

    .where('student.id_student = :id', { id: studentId })

    .groupBy('student.id_student')
    .addGroupBy('user.primer_nombre')
    .addGroupBy('user.segundo_nombre')
    .addGroupBy('user.primer_apellido')
    .addGroupBy('user.segundo_apellido')
    .addGroupBy('user.activo')
    .addGroupBy('gradesAgg.evaluaciones')
    .addGroupBy('gradesAgg.promedio_evaluaciones')

    .getRawOne();

  if (!result) {
    throw new NotFoundException(`Estudiante con id ${studentId} no encontrado`);
  }
const comments = await this.commentsRepository
  .createQueryBuilder('comment')
  .leftJoin('comment.course', 'course')
  .where('comment.student_id = :id', { id: studentId })
  .orderBy('comment.created_at', 'DESC')
  .getMany();

  return {
    ...result,
    evaluaciones: result.evaluaciones
      ? JSON.parse(result.evaluaciones)
      : [],
    promedio_asistencia: Number(result.promedio_asistencia) * 100,
    promedio_evaluaciones: Number(result.promedio_evaluaciones) * 100,
    comentarios: comments
  };
}

  async create(dto: CreateStudentDto) {
    return await this.dataSource.transaction(async (manager) => {

      // 1. USER
      const user = manager.create(User, {
        cedula: dto.cedula,
        primer_nombre: dto.primer_nombre,
        segundo_nombre: dto.segundo_nombre,
        primer_apellido: dto.primer_apellido,
        segundo_apellido: dto.segundo_apellido,
        email: dto.email,
        email_secundario: dto.email_secundario,
        telefono: dto.telefono,
        password_hash: dto.password_hash || 'default123',
        role: 1,
      });

      const savedUser = await manager.save(user);

      // 2. CALCULO
      const base = dto.mensualidad_base || 0;
      const iva = dto.tasa_iva ?? 0.19;
      const total = base * (1 + iva);

      // 3. STUDENT
      const student = manager.create(Student, {
        id_student: savedUser.id_user,
        mes_matricula: dto.mes_matricula,
        fecha_pago_dia: dto.fecha_pago_dia,
        mensualidad_base: base,
        tasa_iva: iva,
        total_mensual: total,
        fecha_inicio: dto.fecha_inicio,
        fecha_salida: dto.fecha_salida,
        no_contactar: dto.no_contactar,
        correo_teams: dto.correo_teams,
      });

      await manager.save(student);

      return {
        message: 'Estudiante creado correctamente',
        id: savedUser.id_user,
      };
    });
  }
}
