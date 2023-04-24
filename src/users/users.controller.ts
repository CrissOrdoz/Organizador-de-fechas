import { Body, Controller, Post, Param, ParseIntPipe, Delete} from '@nestjs/common';
import { Get, Patch } from '@nestjs/common/decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Get(':id')
    getOneUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.getOneUser(id)
    }

    @Get('fecha/:fecha')
    getForDate(@Param('fecha') fecha: Date){
        return this.usersService.getForDate(fecha);
    }
    
    /**@Post()
    async createUser(@Body() body: CreateUserDto): Promise<void>{
        return this.usersService.createUser(body);
    }*/

    
    @Post()
    createUser(@Body() newUser: CreateUserDto) {
        return this.usersService.crearUsuario(newUser);
    }

    @Delete(':id')
    deleteUser(@Param( 'id', ParseIntPipe) id: number) {
       return this.usersService.deleteUser(id)
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto){
        return this.usersService.updateUser(id, user)
    }

    
}

@Controller('fechas')
export class controladorFechas{
    
}