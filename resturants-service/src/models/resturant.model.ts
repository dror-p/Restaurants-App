import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Resturant {
    //add ID column to manage the resaurants table better
    @PrimaryColumn()
    name!: string;

    @Column()
    resturanttype!: string;

    @Column()
    address!: string;

    @Column()
    phone!: string;
}