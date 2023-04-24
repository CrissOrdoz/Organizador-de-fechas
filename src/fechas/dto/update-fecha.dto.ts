import { PartialType } from '@nestjs/mapped-types';
import { CreateFechaDto } from './create-fecha.dto';

export class UpdateFechaDto extends PartialType(CreateFechaDto) {}
