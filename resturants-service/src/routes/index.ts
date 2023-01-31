import express from 'express';
import { getAllRestaurants, getRestaurantByName, addRestaurant, updateRestaurant, deleteRestaurant } from '../controllers/restaurants';

const router = express.Router();

router.get('/restaurants', getAllRestaurants);
router.get('/restaurants/:name', getRestaurantByName);
router.post('/restaurants', addRestaurant);
router.put('/restaurants/:name', updateRestaurant);
router.delete('/restaurants/:name', deleteRestaurant);

export default router;




