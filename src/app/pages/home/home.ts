import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // Simular si el usuario está logueado o no
  isLoggedIn = false; // Cambiar a true para ver la vista de usuario logueado

  // Datos para el carousel de restaurantes
  featuredRestaurants = [
    { id: 1, name: 'Restaurante 1', image: 'https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Rest+1' },
    { id: 2, name: 'Restaurante 2', image: 'https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Rest+2' },
    { id: 3, name: 'Restaurante 3', image: 'https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Rest+3' }
  ];

  currentCarouselIndex = 0;

  // Categorías destacadas
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
