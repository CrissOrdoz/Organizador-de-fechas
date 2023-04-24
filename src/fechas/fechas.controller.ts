import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FechasService } from './fechas.service';
import { CreateFechaDto } from './dto/create-fecha.dto';
import { UpdateFechaDto } from './dto/update-fecha.dto';

@Controller('fechas')
export class FechasController {
  constructor(private readonly fechasService: FechasService) {}

  @Post()
  create(@Body() createFechaDto: CreateFechaDto) {
    return this.fechasService.create(createFechaDto);
  }

  @Get()
  findAll() {
    return this.fechasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fechasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFechaDto: UpdateFechaDto) {
    return this.fechasService.update(+id, updateFechaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fechasService.remove(+id);
  }
}
