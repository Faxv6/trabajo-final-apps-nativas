import { Injectable } from '@angular/core';
import { NewUser } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly URL_BASE = "/api/";


  async register(registerData: NewUser) {
    return await fetch(this.URL_BASE + "users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData)
    }
    );
  }
} 