//Listado, pestañas - https://angular.io/docs

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../services/restaurant-service';
import { ProductsService } from '../../services/products-service';
import { CategoriesService } from '../../services/categories-service';
import { Category } from '../../interfaces/category';


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

  isLoading: boolean = true;
  restaurant: any = null;
  activeTab: string = 'products';
  idCategory: string | null = null;
  userId: string | null = null;



  products: any[] = [];
  categories: Category[] = [];
  promotions: any[] = [];
  favorites: any[] = [];


  async ngOnInit(): Promise<void> {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (!this.userId) {
      return;
    }

    this.restaurant = await this.restaurantService.getRestaurantById(this.userId);

    this.products = [];
    this.categories = await this.categoriesService.getCategories(this.userId!);
    console.log("CAtegorias:", this.categoriesService.getCategories(this.userId))
    this.promotions = [];
    this.favorites = [];

    this.isLoading = false;

  }
}
