import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Actividad } from './fechas/entities/fecha.entity';
import { Actividadorg } from './fechas/entities/actividadorg.entity';

import { FechasModule } from './fechas/fechas.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nestdb',
      entities: [User, Actividad, Actividadorg],
      synchronize: true,
    }),
    UsersModule,
    FechasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
