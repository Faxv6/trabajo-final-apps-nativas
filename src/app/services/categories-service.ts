import { inject, Inject, Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  readonly URL_BASE = "https://w370351.ferozo.com";
  authService = inject(AuthService)
  categories: Category[] = []

  async getCategory() {
    const res = await fetch(this.URL_BASE,
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        }
      }
    )
    const resJson: Category[] = await res.json()
    this.categories = resJson;
  }

  async createContact(nuevaCategoria: Category) {
    const res = await fetch(this.URL_BASE,
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
  async deleteContact(id: number) {
    const res = await fetch(this.URL_BASE + "/" + id,
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
