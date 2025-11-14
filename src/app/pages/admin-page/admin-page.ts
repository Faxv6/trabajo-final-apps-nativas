import { Component, inject, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant-service';
import { CategoriesService } from '../../services/categories-service';
import { RouterLink } from "@angular/router";
import Swal from 'sweetalert2';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-admin-page',
  imports: [RouterLink],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.scss',
})
export class AdminPage implements OnInit {
  restaurantService = inject(RestaurantService)
  categoriesService = inject(CategoriesService)
  category: Category | undefined
  ngOnInit(): void {
    // Load categories into the service so templates can iterate over `categoriesService.categories`
    this.categoriesService.getCategories();
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

}
