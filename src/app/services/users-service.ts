import { Injectable } from '@angular/core';
import { NewUser } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  async register(registerData: NewUser) {
    return await fetch("https://w370351.ferozo.com/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData)
    }
    );
  }
} 