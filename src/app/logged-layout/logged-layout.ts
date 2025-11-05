import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-logged-layout',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './logged-layout.html',
  styleUrl: './logged-layout.scss',
})
export class LoggedLayout {
  isLoggedIn = false;
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
