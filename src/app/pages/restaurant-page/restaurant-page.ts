//Listado, pestañas - https://angular.io/docs

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../services/restaurant-service';
import { ProductsService } from '../../services/products-service';
import { CategoriesService } from '../../services/categories-service';


@Component({
  selector: 'app-restaurant-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './restaurant-page.html',
  styleUrl: './restaurant-page.scss',
})
export class RestaurantPage implements OnInit {
  restaurantService = inject(RestaurantService);
  categoriesService = inject(CategoriesService)
  productsService = inject(ProductsService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  // Variables usadas por la plantilla
  isLoading: boolean = true;
  restaurant: any = null;
  activeTab: string = 'products';
  idCategory: string | null = null;


  products: any[] = [];
  categories: any[] = [];
  promotions: any[] = [];
  favorites: any[] = [];


  async ngOnInit(): Promise<void> {
    this.idCategory = this.route.snapshot.paramMap.get('id');
    if (!this.idCategory) {
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    try {
      this.restaurant = await this.restaurantService.getRestaurantById(this.idCategory);

      this.products = []; // TODO: fetch products for this restaurant
      this.categories = [await this.categoriesService.getCategories(this.idCategory)];
      console.log("CAtegorias:", this.categories) // TODO: fetch categories for this restaurant
      this.promotions = []; // TODO: fetch promotions
      this.favorites = []; // TODO: fetch favorites
    } catch (err) {
      console.error('Error loading restaurant page', err);
      this.restaurant = null;
    } finally {
      this.isLoading = false;
    }
  }
}
