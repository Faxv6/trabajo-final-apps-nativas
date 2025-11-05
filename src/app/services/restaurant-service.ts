import { inject, Injectable } from '@angular/core';
import { NewUser, Users } from '../interfaces/users';
import { AuthService } from './auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  aleatorio = Math.random();
  authService = inject(AuthService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  readonly URL_BASE = "https://w370351.ferozo.com/api/users ";

  restaurants: Users[] = []

  /** Obtiene los restaurants del backend y devuelve el array (también guarda en this.restaurants)
   *  Retorna [] en caso de error o si la respuesta no es ok.
   */
  async getRestaurants(): Promise<Users[]> {
    try {
      const res = await fetch(this.URL_BASE,
        {
          headers: {
            Authorization: "Bearer " + this.authService.token,
          }
        }
      );

      if (!res.ok) {
        console.error('Error fetching restaurants', res.status, await res.text());
        this.restaurants = [];
        return [];
      }

      const resJson: Users[] = await res.json();
      this.restaurants = resJson || [];
      return this.restaurants;
    } catch (err) {
      console.error('getRestaurants failed', err);
      this.restaurants = [];
      return [];
    }
  }

  /** Devuelve un contato en particular segun su ID */
  async getRestaurantById(id: string | number) {
    const res = await fetch(this.URL_BASE + "/" + id,
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      });
    if (!res.ok) return;
    const resRestaurant: Users = await res.json();
    return resRestaurant;
  }
}