import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductsService } from '../../services/products-service';
import { NewProduct } from '../../interfaces/products';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Spinner } from '../spinner/spinner';
import { RestaurantService } from '../../services/restaurant-service';
import { InvokeFunctionExpr } from '@angular/compiler';
import { CategoriesService } from '../../services/categories-service';

@Component({
  selector: 'app-new-edit-product',
  standalone: true, // Asumo que es standalone por los imports
  imports: [CommonModule, FormsModule, Spinner, RouterLink],
  templateUrl: './new-edit-products.html', // Asegúrate que coincida el nombre
  styleUrl: './new-edit-products.scss',
})
export class NewEditProduct {
  productsService = inject(ProductsService);
  restaurantService = inject(RestaurantService);
  categoriesService = inject(CategoriesService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  idproduct: string | null = null;
  isEditMode = false;
  isLoading = false;
  userId: string | null = null
  @Input() initialName: string | null = null;
  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  name: string = '';
  description: string = '';
  price: number | null = null;
  categoryId: number | null = null;
  categoryName: string = '';
  featured: boolean = false;
  labels: [] = [];
  recommendedFor: number = 0;
  discount: number | null = null;
  hasHappyHour: boolean = false;
  userdId: string | null = null;

  async ngOnInit(): Promise<void> {

    this.idproduct = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.idproduct;

    if (this.isEditMode && this.idproduct) {
      await this.productsService.getProducts(this.restaurantService.getUserId()!);
    }
  }

  async handleFormSubmission(_newProductForm: NgForm) {
    const nuevoProducto: NewProduct = {
      name: this.name,
      description: this.description,
      price: this.price!,
      categoryId: this.categoryId!,
      featured: this.featured,
      labels: this.labels,
      recommendedFor: this.recommendedFor,
      discount: this.discount || 0,
      hasHappyHour: false,
    };
    console.log(this.restaurantService.getUserId()!
    )
    let res;

    try {
      if (this.isEditMode && this.idproduct) {
        res = await this.productsService.editProduct({ ...nuevoProducto, id: Number(this.idproduct) } as any);
      } else {
        res = await this.productsService.createProduct(nuevoProducto);
      }
    } catch (e) {
      console.error("Error al enviar formulario:", e);
      res = null;
    } finally {
      this.isLoading = false; // 2. Apagar loading DESPUÉS de la llamada
    }

    if (!res) {
      return;
    }
    this.router.navigate(["/admin-page/" + this.restaurantService.getUserId()]);
  }
}