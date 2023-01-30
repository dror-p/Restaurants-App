import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private restaurantsUrl = 'http://localhost:3000/api/restaurants'; //move to config

  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.restaurantsUrl);
  }

  getRestaurant(name: string): Observable<Restaurant> {
    const url = `${this.restaurantsUrl}/${name}`;
    return this.http.get<Restaurant>(url);
  }

  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.restaurantsUrl, restaurant);
  }

  updateRestaurant(restaurant: Restaurant): Observable<any> {
    return this.http.put(`${this.restaurantsUrl}/${restaurant.name}`, restaurant);
  }

  deleteRestaurant(name: string): Observable<Restaurant> {
    return this.http.delete<Restaurant>(`${this.restaurantsUrl}/restaurants/${name}`);
  }
}
