import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { RestaurantService } from '../../services/restaurant-service';

@Component({
  selector: 'app-logged-layout',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './logged-layout.html',
  styleUrls: ['./logged-layout.scss'],
})
export class LoggedLayout {
  authService = inject(AuthService);
  restaurantService = inject(RestaurantService)

  logout() {
    this.authService.logout();
  }
}
