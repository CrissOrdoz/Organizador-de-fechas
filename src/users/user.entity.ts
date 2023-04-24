import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({ name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;
    
    @Column()
    password: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({ type: 'datetime'})
    fecha: Date;

}

@Entity({name:'fechas'})
export class Fecha {
    
}