import { Module } from '@nestjs/common';
import { FechasService } from './fechas.service';
import { FechasController } from './fechas.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividad } from './entities/fecha.entity';
import { Actividadorg } from './entities/actividadorg.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Actividad]),
    TypeOrmModule.forFeature([Actividadorg])
  ],
  controllers: [FechasController],
  providers: [FechasService]
})
export class FechasModule {}
