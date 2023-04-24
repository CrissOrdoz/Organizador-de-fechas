import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { controladorFechas, UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    EventEmitterModule.forRoot(),  ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([User])],
  controllers: [UsersController, controladorFechas],
  providers: [UsersService]
})
export class UsersModule {}
