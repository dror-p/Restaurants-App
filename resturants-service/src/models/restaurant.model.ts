import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Restaurant {
    //add ID column to manage the resaurants table better
    @PrimaryColumn()
    name!: string;

    @Column()
    restauranttype!: string;

    @Column()
    address!: string;

    @Column()
    phone!: string;
}