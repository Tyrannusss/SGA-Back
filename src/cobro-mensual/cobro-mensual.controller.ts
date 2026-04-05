import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CobroMensualService } from './cobro-mensual.service';
import { CreateCobroMensualDto } from './dto/create-cobro-mensual.dto';
import { UpdateCobroMensualDto } from './dto/update-cobro-mensual.dto';

@Controller('cobro-mensual')
export class CobroMensualController {
  constructor(private readonly cobroMensualService: CobroMensualService) {}

  @Post()
  create(@Body() createCobroMensualDto: CreateCobroMensualDto) {
    return this.cobroMensualService.create(createCobroMensualDto);
  }

  @Get()
  findAll() {
    return this.cobroMensualService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cobroMensualService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCobroMensualDto: UpdateCobroMensualDto) {
    return this.cobroMensualService.update(+id, updateCobroMensualDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cobroMensualService.remove(+id);
  }
}
