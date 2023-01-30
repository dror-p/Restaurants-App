import { Request, Response } from 'express';
import { query, close } from '../services/db';

export const getAllRestaurants = async (req: Request, res: Response) => {
    try {
        const result = await query('SELECT * FROM resturants');
        res.status(200).json(result.rows);
    } catch (err) {
        if(err instanceof Error){
            console.log(err);
        }
        res.status(500).send({ message: 'Error finding resturants' });
    }
}

export const getRestaurantByName = async (req: Request, res: Response) => {
    const name = req.params.name;
    try {
        const result = await query('SELECT * FROM resturants WHERE name = $1', [name]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        if(err instanceof Error){
            console.log(err);
        }
        res.status(500).send({ message: 'Error finding restaurant' });
    }
}

export const addRestaurant = async (req: Request, res: Response) => {
    const { name, resturanttype, phone, address } = req.body;
    try {
        //change to insert to the csv not the pg
        await query('INSERT INTO resturants(name, resturanttype, address, phone) VALUES($1, $2, $3, $4)', [name, resturanttype, phone, address]);
        res.status(201).send(`Restaurant added with name: ${name}`);
    } catch (err) {
        if(err instanceof Error){
            console.log(err);
        }
        res.status(500).send({ message: 'Error adding restaurants' });
    }
}

export const updateRestaurant = async (req: Request, res: Response) => {
    const { name, resturanttype, phone, address } = req.body;
    try {
        await query(
            //change to update to the csv not the pg
            'UPDATE resturants SET resturanttype = $2, phone = $3, address = $4 WHERE name = $1',
            [resturanttype, phone, address]
        );
        res.status(200).send(`Restaurant modified with name: ${name}`);
    } catch (err) {
        if(err instanceof Error){
            console.log(err);
        }
        res.status(500).send({ message: 'Error editing restaurants' });
    }
}

export const deleteRestaurant = async (req: Request, res: Response) => {
    const name = req.params.name;
    try {
        //change to delete to the csv not the pg
        await query('DELETE FROM resturants WHERE name = $1', [name]);
        res.status(200).send(`Restaurant deleted with name: ${name}`);
    } catch (err) {
        if(err instanceof Error){
            console.log(err);
        }
        res.status(500).send({ message: 'Error deleting restaurants' });
    }
}
