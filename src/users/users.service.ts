  import { Injectable } from '@nestjs/common';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { InjectRepository } from '@nestjs/typeorm';
  import { User } from './entities/user.entity';
  import { Repository } from 'typeorm';
  import * as bcrypt from 'bcrypt';

  @Injectable()
  export class UsersService {
      constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
    ) {}

    findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }



  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password_hash, 10);

    const user = this.usersRepository.create({
      ...createUserDto,
      password_hash: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

// users.service.ts

async updatePassword(userId: number, newPassword: string) {
  const user = await this.usersRepository.findOne({
    where: { id_user: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password_hash = hashedPassword;

  return this.usersRepository.save(user);
}

  async getProfile(adminId: number) {
    return this.usersRepository.findOne({
      where: { id_user: adminId }
    });

  }
}
