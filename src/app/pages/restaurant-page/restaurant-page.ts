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
  favorites: any[] = [];

  menu: MenuSection[] = [];
  // variable para checkear id de categoria para el filtrado
  selectedCategoryId: number | null = null;

  // getter que devuelve el menú filtrado
  get filteredMenu(): MenuSection[] {
    if (this.selectedCategoryId === null) {
      return this.menu; // Devuelve todo
    }
    // devuelve solo la sección que coincide con el ID seleccionado
    return this.menu.filter(section => section.category.id === this.selectedCategoryId);
  }

  async ngOnInit(): Promise<void> {
    // obtener el ID del restaurante desde la URL
    this.userId = this.route.snapshot.paramMap.get('id');
    if (!this.userId) {
      return;
    } 

    try {
      const [restaurant, categories, products] = await Promise.all([
        this.restaurantService.getRestaurantById(this.userId),
        this.categoriesService.getCategories(this.userId!),
        this.productsService.getProducts(this.userId),]);

      this.restaurant = restaurant;
      this.categories = categories || [];
      this.products = products || [];

      this.organizeMenu();
      this.favorites = [];

    } catch (error) {
      console.error('error cargando la data del restaurant:', error)

    }
    this.isLoading = false;

  }

  organizeMenu() {
    if (!this.categories.length || !this.products.length) {
      this.menu = [];
      return;
    }
    // .map para crear secciones del menú por categoría
    this.menu = this.categories.map(category => {
      return {
        category: category,
        products: this.products.filter(p => p.categoryId === category.id)
      };
    })
      // Ocultamos las categorías vacías
      .filter(section => section.products.length > 0);
  }

  // Función para cambiar el filtro
  setCategoryFilter(id: number | null) {
    this.selectedCategoryId = id;
  }


}
