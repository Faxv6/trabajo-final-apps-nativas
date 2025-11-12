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

  decodeToken(): Record<string, any> | null {
    const token = this.authService.token;
    if (!token) return null;

    try {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const payload = parts[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
      const json = atob(padded);
      return JSON.parse(decodeURIComponent(json.split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')));
    } catch (err) {
      console.error('decodeToken failed', err);
      return null;
    }
  }

  /**
   * Devuelve las claims (payload) del token actual. Alias de decodeToken para claridad.
   */
  getTokenClaims(): Record<string, any> | null {
    return this.decodeToken();
  }

  /** Devuelve el id del usuario según las claims del token (sub | id | userId). */
  getUserId(): string | null {
    const claims = this.getTokenClaims();
    if (!claims) return null;
  return (claims['sub'] ?? claims['id'] ?? claims['userId'] ?? null) as string | null;
  }

  /** Devuelve el nombre del restaurante / usuario según las claims más comunes. */
  getRestaurantName(): string | null {
    const claims = this.getTokenClaims();
    if (!claims) return null;
  return (claims['restaurantName'] ?? claims['name'] ?? claims['unique_name'] ?? claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? null) as string | null;
  }

  /** Devuelve la fecha de expiración (exp) como timestamp (segundos) si existe. */
  getTokenExpiration(): number | null {
    const claims = this.getTokenClaims();
    if (!claims) return null;
  return typeof claims['exp'] === 'number' ? claims['exp'] : (claims['exp'] ? Number(claims['exp']) : null);
  }
}