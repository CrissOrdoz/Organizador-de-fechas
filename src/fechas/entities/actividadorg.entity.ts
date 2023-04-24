import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({ name: 'actividadesorg'})
export class Actividadorg {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column({ type: 'datetime'})
    fechaProx: Date;

    //@Column()
    //activityIds: number;

}