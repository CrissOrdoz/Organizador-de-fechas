import { Injectable, Logger, Param} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './events/user-created.event';
import { Cron, CronExpression, SchedulerRegistry, Timeout }  from '@nestjs/schedule';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
 
    constructor(@InjectRepository(User) private userRepository: Repository<User>, private eventEmitter: EventEmitter2, private schedulerRegistry: SchedulerRegistry) {}

    


    crearUsuario(user: CreateUserDto){
        this.logger.log('Enviando usuario...', user);

        const username = user.username;
        const  establishWsTimeout = setTimeout(
            () => this.stablishWsConnection(username), 5000,  
        );


        const newUser = this.userRepository.create(user)
        return this.userRepository.save(newUser)
    }

    private stablishWsConnection( username: string){
        this.logger.log('Usuario creado...', username)
    }






    async createUser(body: CreateUserDto ) {
        this.logger.log('Creating user...', body);
        const userId = '123'; 
        this.eventEmitter.emit(
            'user.created', 
            new UserCreatedEvent(userId, body.username),
        );

        const  establishWsTimeout = setTimeout(
            () => this.stablishWsConnection(userId), 5000,  
        );
        this.schedulerRegistry.addTimeout('prueba2', establishWsTimeout)
    }

    /**private stablishWsConnection( userId: string){
        this.logger.log('Estableciendo...', userId)
    }*/

    /**@OnEvent('user.created')
    welcomeNewUser(payload: UserCreatedEvent){
        this.logger.log('Welcoming new user...', payload.email, payload.userId)
    }*/
    
    @Cron('* * 1 * * *')
    evettheUsers() {
        this.logger.log('Se esta escuchando el evento')
    }
    
    
    /**createUser(user: CreateUserDto) {
        const newUser = this.userRepository.create(user)
        return this.userRepository.save(newUser)
    }*/

    getUsers() {
        return  this.userRepository.find()
    }

    getOneUser(id: number) {
        return  this.userRepository.findOne({
            where:{
                id
            }
        })
    }

    getForDate(date: Date){
        return this.userRepository.findBy({
            fecha: date,
        })
    }

    deleteUser(id: number){
        return this.userRepository.delete({
            id
        })
    }

    updateUser(id: number, username: UpdateUserDto) {
       return this.userRepository.update({id}, username)
    }
}
