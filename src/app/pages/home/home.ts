import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  
  isLoggedIn = false; 

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
    this.currentCarouselIndex = (this.currentCarouselIndex + 1) % this.featuredRestaurants.length;
  }

  prevSlide() {
    this.currentCarouselIndex = this.currentCarouselIndex === 0
      ? this.featuredRestaurants.length - 1
      : this.currentCarouselIndex - 1;
  }
}
