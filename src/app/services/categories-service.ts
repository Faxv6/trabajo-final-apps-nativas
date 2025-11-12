import { inject, Inject, Injectable } from '@angular/core';
import { Category, NewCategory } from '../interfaces/category';
import { AuthService } from './auth-service';
import { RestaurantService } from './restaurant-service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  readonly URL_BASE = "https://w370351.ferozo.com";
  authService = inject(AuthService)
  categories: Category[] = []
  restaurantService = inject(RestaurantService)

  async getCategories() {
    try {
      const res = await fetch(this.URL_BASE + "/api/users/" + this.restaurantService.getUserId() + "/categories",
        {
          headers: {
            Authorization: "Bearer " + this.authService.token,
          }
        }
      )
      if (!res.ok) {
        console.error('Failed to load categories', res.status, res.statusText)
        this.categories = []
        return
      }
      const resJson: Category[] = await res.json()
      this.categories = resJson;
    } catch (err) {
      console.error('Error fetching categories', err)
      this.categories = []
    }
  }

  async createCategory(nuevaCategoria: NewCategory) {
    const res = await fetch(this.URL_BASE + "/api/categories",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.token,
        },
        body: JSON.stringify(nuevaCategoria)
      });
    if (!res.ok) return;
    const resCategory: Category = await res.json();
    this.categories.push(resCategory);
    return resCategory;
  }

  /** Edita una categoria */
  async editCategory(categoriaEditada: Category) {
    const res = await fetch(this.URL_BASE + "/" + categoriaEditada.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.token,
        },
        body: JSON.stringify(categoriaEditada)
      });
    if (!res.ok) return;
    /** Edita la lista actual de categorias reemplazando sólamente la que editamos */
    this.categories = this.categories.map(category => {
      if (category.id === categoriaEditada.id) {
        return categoriaEditada;
      };
      return category;
    });
    return categoriaEditada;
  }

  /** Borra una categoria */
  async deleteCategory(id: number | string) {
    this.categories
    const res = await fetch(this.URL_BASE + "/api/categories" + "/" + id,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      });
    if (!res.ok) return;
    this.categories = this.categories.filter(category => category.id !== id);
    return true;
  }
}
