import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({ name: 'actividades'})
export class Actividad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    fechaAct: Date;

    @Column({ type: 'datetime'})
    fechaProx: Date;

}

