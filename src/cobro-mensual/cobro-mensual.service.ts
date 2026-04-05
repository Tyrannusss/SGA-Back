import { Injectable } from '@nestjs/common';
import { CreateCobroMensualDto } from './dto/create-cobro-mensual.dto';
import { UpdateCobroMensualDto } from './dto/update-cobro-mensual.dto';

@Injectable()
export class CobroMensualService {
  create(createCobroMensualDto: CreateCobroMensualDto) {
    return 'This action adds a new cobroMensual';
  }

  findAll() {
    return `This action returns all cobroMensual`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cobroMensual`;
  }

  update(id: number, updateCobroMensualDto: UpdateCobroMensualDto) {
    return `This action updates a #${id} cobroMensual`;
  }

  remove(id: number) {
    return `This action removes a #${id} cobroMensual`;
  }
}
