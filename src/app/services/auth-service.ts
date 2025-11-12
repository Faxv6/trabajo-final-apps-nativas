import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Este service se encarga del login, de tener el token y de deslogear
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
      this.router.navigate([""])
      this.token = await res.text();
      localStorage.setItem("token", this.token);
    }
  }

  logout() {
    localStorage.clear()
    this.token = null;
    this.router.navigate(["/login"]);
  }

  getToken() {
    return this.token;
  }

  isLoggedIn() {
    return !!this.token;
  }

  /**Revisa el token cada 10 mins */
  revisionToken() {
    return setInterval(() => {
      if (this.token) {
        const base64Url = this.token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const claims: { exp: number } = JSON.parse(jsonPayload);
        if (new Date(claims.exp * 1000) < new Date()) {
          this.logout()
        }
      }
    }, 600)
  }
}


