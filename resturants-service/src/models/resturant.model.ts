import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Resturant {
    @PrimaryColumn()
    name!: string;

    @Column()
    resturanttype!: string;

    @Column()
    address!: string;

    @Column()
    phone!: string;
}