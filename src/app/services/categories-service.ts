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

  /** If the server indicates the token is invalid/expired, show a swal (if available) and logout */
  private showTokenExpired(status?: number) {
    const isAuthError = status === 401 || status === 403
    if (!isAuthError) return

    const swal = (window as any).Swal
    const msg = 'Tu sesión expiró. Por favor inicia sesión de nuevo.'
    if (swal && typeof swal.fire === 'function') {
      swal.fire({
        icon: 'warning',
        title: 'Sesión expirada',
        text: msg,
        confirmButtonText: 'Ir al login'
      }).then(() => this.authService.logout())
    } else {
      // fallback
      alert(msg)
      this.authService.logout()
    }
  }

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
        // if auth error, notify and logout
        if (res.status === 401 || res.status === 403) this.showTokenExpired(res.status)
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
    if (!res.ok) {
      if (res.status === 401 || res.status === 403) this.showTokenExpired(res.status)
      return;
    }
    const resCategory: Category = await res.json();
    this.categories.push(resCategory);
    return resCategory;
  }

  /** Edita una categoria */
  async editCategory(categoriaEditada: Category) {
    const res = await fetch(this.URL_BASE + "/api/categories/" + categoriaEditada.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.token,
        },
        body: JSON.stringify(categoriaEditada)
      });
    if (!res.ok) {
      if (res.status === 401 || res.status === 403) this.showTokenExpired(res.status)
      return;
    }
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
    const res = await fetch(this.URL_BASE + "/api/categories/" + id,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      });
    if (!res.ok) {
      if (res.status === 401 || res.status === 403) this.showTokenExpired(res.status)
      return;
    }
    this.categories = this.categories.filter(category => category.id !== id);
    return true;
  }
}
