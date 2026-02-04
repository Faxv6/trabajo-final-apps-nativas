import { inject, Injectable } from '@angular/core';
import { NewUser, Users } from '../interfaces/users';
import { AuthService } from './auth-service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  authService = inject(AuthService);
  router = inject(Router);
  // base URL for user-related endpoints (no trailing space)
  readonly URL_BASE = "https://w370351.ferozo.com/api/users";

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

  /** Devuelve un contacto en particular segun su ID */
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

  decodeToken() {
    const token = this.authService.token;
    if (!token) return null;
    return jwtDecode(token);

  }

  /** Devuelve las claims (payload) del token actual.*/
  getTokenClaims() {
    return this.decodeToken();
  }

  /** Devuelve el id del usuario según las claims del token (sub | id | userId). */
  getUserId() {
    const claims = this.getTokenClaims();
    if (!claims) return '';
    const c = claims as any;
    return (c['sub']) as string;
  }

  /** Devuelve el nombre del restaurante / usuario según las claims más comunes. */
  getRestaurantName(): string {
    const claims = this.getTokenClaims();
    if (!claims) return '';
    const c = claims as any;
    return (c['restaurantName'] ?? c['name']) as string;
  }

  async register(registerData: NewUser) {
    return await fetch("https://w370351.ferozo.com/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData)
    });
  }

  async updateRestaurantName(newName: string) {
    const userId = this.getUserId();
    if (!userId) return '';
    try {
      const current = await this.getRestaurantById(userId);
      const payload = current ? { ...current, restaurantName: newName } : null;

      const res = await fetch(this.URL_BASE + "/" + userId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.token,
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        console.error('Failed to update restaurant name', res.status, await res.text());
        return '';
      }

      const updated = await res.json();
      if (this.restaurants && Array.isArray(this.restaurants)) {
        this.restaurants = this.restaurants.map(r => r.id === updated.id ? updated : r as Users);
      }
      return updated;
    } catch (err) {
      console.error('updateRestaurantName failed', err);
      return '';
    }
  }

  async deleteRestaurant(id: string | number) {
    const res = await fetch(this.URL_BASE + "/" + id,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      });
    if (!res.ok) return false;
    this.restaurants = this.restaurants.filter(restaurant => restaurant.id !== id);
    this.router.navigate(['']);
    return true;
  }
}