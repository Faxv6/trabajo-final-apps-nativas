import { inject, Injectable } from '@angular/core';
import { NewProduct, Products } from '../interfaces/products';
import { AuthService } from './auth-service';
import { RestaurantService } from './restaurant-service';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  readonly URL_BASE = "https://w370351.ferozo.com";
  restaurantService = inject(RestaurantService)
  products: Products[] = []
  authService = inject(AuthService)

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

  async getProducts(id: string | number) {
    try {
      const res = await fetch(this.URL_BASE + "/api/users/" + id + "/products",
        {
          headers: {
            Authorization: "Bearer " + this.authService.token,
          }
        }
      )
      const resJson: Products[] = await res.json()
      this.products = resJson;
    } catch (err) {
      console.error('Error fetching products', err)
      this.products = []
    }
    return this.products;
  }
  getProductById() {

  }
  async createProduct(nuevoProducto: NewProduct) {
    const res = await fetch(this.URL_BASE + "/api/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.token,
        },
        body: JSON.stringify(nuevoProducto)
      });
    if (!res.ok) {
      if (res.status === 401 || res.status === 403) this.showTokenExpired(res.status)
      return;
    }
    const resProduct: Products = await res.json();
    this.products.push(resProduct);
    return resProduct;
  }
  async editProduct(productoditado: Products) {
    const res = await fetch(this.URL_BASE + "/api/products/" + productoditado.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.token,
        },
        body: JSON.stringify(productoditado)
      });
    if (!res.ok) {
      if (res.status === 401 || res.status === 403) this.showTokenExpired(res.status)
      return;
    }
    /** Edita la lista actual de categorias reemplazando sólamente la que editamos */
    this.products = this.products.map(product => {
      if (product.id === productoditado.id) {
        return productoditado;
      };
      return product;
    });
    return productoditado;
  }
  async deleteProduct(id: number | string) {
    this.products
    const res = await fetch(this.URL_BASE + "/api/products/" + id,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      });

    this.products = this.products.filter(product => product.id !== id);
    return true;
  }

}
