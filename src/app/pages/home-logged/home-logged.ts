import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../../services/restaurant-service';
import { Users } from '../../interfaces/users';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home-logged.html',
  styleUrls: ['./home-logged.scss'],
})
export class HomeLogged {
  restaurantService = inject(RestaurantService)
  isLoggedIn = true;

  get restaurants(): Users[] {
    return this.restaurantService.restaurants || [];
  }


  featuredRestaurants = [
    { id: 1, name: 'Restaurante 1' },
    { id: 2, name: 'Restaurante 2' },
    { id: 3, name: 'Restaurante 3' }
  ];

  currentCarouselIndex = 0;

  categories = [
    { id: 1, name: 'Comida' },
    { id: 2, name: 'Comida' },
    { id: 3, name: 'Comida' }
  ];

  nextSlide() {
    const len = this.restaurantService.restaurants?.length || 0;
    if (len === 0) return;
    this.currentCarouselIndex = (this.currentCarouselIndex + 1) % len;
  }

  prevSlide() {
    const len = this.restaurantService.restaurants?.length || 0;
    if (len === 0) return;
    this.currentCarouselIndex = this.currentCarouselIndex === 0
      ? len - 1
      : this.currentCarouselIndex - 1;
  }
}
