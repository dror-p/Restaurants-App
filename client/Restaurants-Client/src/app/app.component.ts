import { Component, OnInit } from '@angular/core';
import { Restaurant } from './models/restaurant.model';
import { RestaurantService } from './services/restaurant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Restaurants-App";
  restaurants: Restaurant[] = [];
  showAddForm = false;
  newRestaurant: Restaurant = {
    name: '',
    restauranttype: '',
    phone: '',
    address: ''
  };

  constructor(private restaurantService: RestaurantService) {
    this.newRestaurant = {
      name: '',
      restauranttype: '',
      phone: '',
      address: ''
    };
  }

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
    });
  }

  addRestaurant(restaurant: Restaurant) {
    this.restaurantService.addRestaurant(this.newRestaurant)
      .subscribe(restaurant => {
        this.restaurants.push(restaurant);
      });
  }
  

  updateRestaurant(name: string, restauranttype: string, phone: string, address: string) {
    this.restaurantService.updateRestaurant({ name, restauranttype, phone, address } as Restaurant)
      .subscribe(() => {
        this.restaurants = this.restaurants.map(restaurant => {
          if (restaurant.name === name) {
            return { name, restauranttype, phone, address };
          }
          return restaurant;
        });
      });
  }

  deleteRestaurant(name: string) {
    this.restaurantService.deleteRestaurant(name)
      .subscribe(() => {
        this.restaurants = this.restaurants.filter(restaurant => restaurant.name !== name);
      });
  }
}
