import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

/**
 * Este service se encarga del login, de tener el token y de desloguear
 * Siempre que se necesite el token hay que llamar a getToken().
 */
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loggeado: boolean = false;
  router = inject(Router);
  token: null | string = localStorage.getItem("token");
  readonly URL_BASE = "https://w370351.ferozo.com";

  async login(loginData: any) {
    const res = await fetch(this.URL_BASE + "/api/Authentication/login",
      {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      }
    );
    if (res.ok) {
// ().token hace q se extraiga el token del json devuelto    
      this.token = (await res.json()).token as string;
      localStorage.setItem("token", this.token);
      this.router.navigate([""])
    }
    return false;
  }

  logout() {
    localStorage.clear()
    this.token = null;
    this.router.navigate(["/login"]);
  }

  getToken() {
    return this.token;
  }

  /** !! este operador convierte el token a bool*/
  isLoggedIn() {
    return !!this.token;
  }

  /**Revisa el token cada 10 mins */
  revisionToken() {
    return setInterval(() => {
      if (this.token) {
        try {
          const claims: { exp: number } = jwtDecode(this.token);
          if (new Date(claims.exp * 1000) < new Date()) {
            this.logout();
          }
        } catch (e) {
          console.error('Error checking token expiration', e);
          this.logout();
        }
      }
    }, 1000 * 60 * 10)
  }
}


