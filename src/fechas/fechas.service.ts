import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividad } from './entities/fecha.entity';
import { Actividadorg } from './entities/actividadorg.entity';
import { CreateFechaDto } from './dto/create-fecha.dto';
import { UpdateFechaDto } from './dto/update-fecha.dto';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';

@Injectable()
export class FechasService {
  private readonly logger = new Logger(FechasService.name);
  constructor(@InjectRepository(Actividad) private actividadRepository: Repository<Actividad>,
              @InjectRepository(Actividadorg) private actividadorgRepository: Repository<Actividadorg>
  ){}

  create(fecha: CreateFechaDto) {
    console.log( "se creo la actividad");
    const newActividad =  this.actividadRepository.create(fecha);
    return this.actividadRepository.save(newActividad);
  }

  @Cron('*/20 * * * * *')
  async organizarFechas(){
    const currentDate = moment().startOf('day');
    const actividades = await this.actividadRepository.find();
    const actividadesOrg = await this.actividadorgRepository.find();
    let lastDay = moment.max(actividadesOrg.map(a => moment(a.fechaProx)));
    console.log(actividadesOrg.length);

    if(actividadesOrg.length == 0){
      lastDay = moment.min( actividades.map(a => moment(a.fechaProx)))
    };

    // filtrar las actividades mayores al ultimo dia de la tabla organizada 
    const filteredActivities = actividades.filter((activity) =>
      moment(activity.fechaProx).isBetween(lastDay,currentDate)
    );

    // ordenar las fehchas de menor a mayor
    const sortedActivities = filteredActivities.sort((a, b) =>
      moment(a.fechaProx).diff(moment(b.fechaProx))
    );

    const newResult = sortedActivities.map((data) => {
      const {id, fechaAct, ...restData} = data
      return restData
    });

    await this.actividadorgRepository.save(newResult);
  } 

  findAll() {
    this.logger.log(this.actividadRepository);
    return this.actividadRepository.find();
  }

  findOne(id: number) {
    return this.actividadRepository.findOne({
      where:{
        id
      }
    });
  }

  update(id: number, updateFechaDto: UpdateFechaDto) {
    return `This action updates a #${id} fecha`;
  }

  remove(id: number) {
    return `This action removes a #${id} fecha`;
  }
}
