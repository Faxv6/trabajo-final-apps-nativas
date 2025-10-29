import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { loginData } from '../interface/auth';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  loggeado: boolean = false;
  router = inject(Router)
  token: null | string = localStorage.getItem("token");

  async login(loginData: loginData) {
    this.loggeado = true;
    const res = await fetch("https://restaurant-api.somee.com/api/Authentication/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    })

    if (res.ok) {
      this.token = await res.text()
      localStorage.setItem("token", this.token)
      this.router.navigate([""])
    }
    console.log("Respuesta del back", res);
  }

  logout() {
    this.token = null
    localStorage.removeItem("token")
    this.router.navigate(["/login"])
  }

}
