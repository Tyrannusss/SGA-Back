import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // 🔹 obtener token desde cookie o header
    const token =
      request.cookies?.token ||
      request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 🔹 adjuntar usuario al request
      request.user = decoded;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}