import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { RestaurantService } from '../../services/restaurant-service';
import { User } from '../../models';
import { Users } from '../../interfaces/users';
import { CategoriesService } from '../../services/categories-service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  restaurantService = inject(RestaurantService)
  categoriesService = inject(CategoriesService)

  ngOnInit(): void {
    this.restaurantService.getRestaurants();
  }

  currentCarouselIndex = 0;

  categories = [];

  nextSlide() {
    this.currentCarouselIndex = (this.currentCarouselIndex + 1) % this.restaurantService.restaurants.length;
  }

  prevSlide() {
    this.currentCarouselIndex = this.currentCarouselIndex === 0
      ? this.restaurantService.restaurants.length - 1
      : this.currentCarouselIndex - 1;
  }

  // Los restaurantes se consultan directamente desde restaurantService.restaurants
}
