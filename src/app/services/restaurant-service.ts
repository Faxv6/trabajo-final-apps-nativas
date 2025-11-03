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
  readonly URL_BASE = "https://restaurant-api.somee.com/api/";

  contacts: Users[] = []

  /** Obtiene los contactos del backend */
  async getRestaurants() {
    const res = await fetch(this.URL_BASE,
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        }
      }
    )
    const resJson: Users[] = await res.json()
    this.contacts = resJson;
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