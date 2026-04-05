import { PartialType } from '@nestjs/mapped-types';
import { CreateCobroMensualDto } from './create-cobro-mensual.dto';

export class UpdateCobroMensualDto extends PartialType(CreateCobroMensualDto) {}
