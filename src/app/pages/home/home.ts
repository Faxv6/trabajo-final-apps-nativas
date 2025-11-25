import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { RestaurantService } from '../../services/restaurant-service';
import { Users } from '../../interfaces/users';
import { CategoriesService } from '../../services/categories-service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  restaurantService = inject(RestaurantService)
  categoriesService = inject(CategoriesService)

  featuredRestaurants: Users[] = [];

  async ngOnInit(): Promise<void> {
    await this.restaurantService.getRestaurants();
    this.selectRandomFeaturedRestaurants();
  }

  selectRandomFeaturedRestaurants() {
    const allRestaurants = [...this.restaurantService.restaurants];
    for (let i = allRestaurants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allRestaurants[i], allRestaurants[j]] = [allRestaurants[j], allRestaurants[i]];
    }
    // Toma los primeros 5 (o menos si hay menos de 5)
    this.featuredRestaurants = allRestaurants.slice(0, 5);
  }

  currentCarouselIndex = 0;

  categories = [];

  nextSlide() {
    if (this.featuredRestaurants.length === 0) return;
    this.currentCarouselIndex = (this.currentCarouselIndex + 1) % this.featuredRestaurants.length;
  }

  prevSlide() {
    if (this.featuredRestaurants.length === 0) return;
    this.currentCarouselIndex = this.currentCarouselIndex === 0
      ? this.featuredRestaurants.length - 1
      : this.currentCarouselIndex - 1;
  }
  // Los restaurantes se consultan directamente desde restaurantService.restaurants
}
