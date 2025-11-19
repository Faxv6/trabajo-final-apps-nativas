import { Component, inject, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant-service';
import { CategoriesService } from '../../services/categories-service';
import { ActivatedRoute, RouterLink } from "@angular/router";
import Swal from 'sweetalert2';
import { Category } from '../../interfaces/category';
import { ProductsService } from '../../services/products-service';
import { Products } from '../../interfaces/products';

@Component({
  selector: 'app-admin-page',
  imports: [RouterLink],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.scss',
})
export class AdminPage implements OnInit {
  restaurantService = inject(RestaurantService)
  categoriesService = inject(CategoriesService)
  productService = inject(ProductsService)
  userId: string | null = null;
  products: Products | undefined

  route = inject(ActivatedRoute)
  category: Category | undefined

  async ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (!this.userId) {
      return;
    }
    await this.categoriesService.getCategories(this.userId!);
    await this.productService.getProducts(this.userId!);
  }

  deleteCategoryModal(id: string | number) {
    Swal.fire({
      title: "¿Querés borrar la categoría?",
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Borrar`,
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isDenied) {
        this.categoriesService.deleteCategory(id)
        Swal.fire("Categoría eliminada");
      }
    });
  }

  deleteProductModal(id: string | number) {
    Swal.fire({
      title: "¿Querés borrar el producto?",
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Borrar`,
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isDenied) {
        this.productService.deleteProduct(id)
        Swal.fire("Prodcto eliminado");
      }
    });
  }
}
