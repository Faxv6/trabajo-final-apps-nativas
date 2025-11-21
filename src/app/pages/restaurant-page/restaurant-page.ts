//Listado, pestañas - https://angular.io/docs

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../services/restaurant-service';
import { ProductsService } from '../../services/products-service';
import { CategoriesService } from '../../services/categories-service';
import { Category } from '../../interfaces/category';

interface MenuSection {
  category: Category;
  products: any[];
}

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
  idCategory: number | null = null;
  userId: string | null = null;

  products: any[] = [];
  categories: Category[] = [];
  promotions: any[] = [];
  favorites: any[] = [];

  menu: MenuSection[] = [];


  async ngOnInit(): Promise<void> {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (!this.userId) {
      return;
    }
 
    try{
      // Cargamos todo al mismo tiempo
      const [restaurant, categories, products] = await Promise.all([
        this.restaurantService.getRestaurantById(this.userId),
        this.categoriesService.getCategories(this.userId!),
        this.productsService.getProducts(this.userId),]);

      this.restaurant = restaurant;
      this.categories = categories || [];
      this.products = products || [];
        
      this.organizeMenu();
      this.promotions = [];
      this.favorites = [];

    } catch (error) {
      console.error('error cargando la data del restaurant:', error)
      
    } finally {
      this.isLoading = false;
    }

  }

  organizeMenu(){
    if (!this.categories.length || !this.products.length) {
        this.menu = [];
        return;
    }
    this.menu = this.categories.map(category => {
        return {
            category: category,
            products: this.products.filter(p => p.categoryId === category.id)
        };
    })
    // Ocultamos las categorías vacías
    .filter(section => section.products.length > 0);
  }
}
