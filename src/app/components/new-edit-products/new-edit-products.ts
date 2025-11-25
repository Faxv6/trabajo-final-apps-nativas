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

  availableLabels: string[] = [
    "Vegan", "Vegetarian", "GlutenFree", "Spicy",
    "SugarFree", "Kids", "Shareable", "None"
  ];

  idproduct: string | null = null;
  isEditMode = false;
  isLoading = false;
  userId: string | null = null

  name: string = '';
  description: string = '';
  price: number | null = null;
  categoryId: number | null = null;
  categoryName: string = '';
  featured: boolean = false;

  selectedLabels: string[] = []; // Array para los checkboxes
  recommendedFor: number | null = null; // Número para la API
  discount: number | null = null;
  hasHappyHour: boolean = false;


  async ngOnInit(): Promise<void> {
    this.userId = this.restaurantService.getUserId();
    this.idproduct = this.route.snapshot.paramMap.get('id');


    if (this.idproduct) {
      this.isEditMode = true;
      this.isLoading = true;


      const products = await this.productsService.getProducts(this.userId!);
      // Comparamos con == por si idproduct viene como string y el ID es number
      const productToEdit = products.find((p: any) => p.id == this.idproduct);

      if (productToEdit) {
        this.fillForm(productToEdit);
      } else {
        this.router.navigate(['/admin-page', this.userId]);
      }
    }
  }

  fillForm(product: any) {
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.categoryId = product.categoryId;
    this.featured = product.featured;
    this.discount = product.discount;
    this.hasHappyHour = product.hasHappyHour;
    this.recommendedFor = product.recommendedFor;

    if (Array.isArray(product.labels)) {
      this.selectedLabels = product.labels;
    }
  }

  // Función para manejar Checkboxes
  onLabelChange(event: any, label: string) {
    if (event.target.checked) {
      if (!this.selectedLabels.includes(label)) {
        this.selectedLabels.push(label);
      }
    } else {
      this.selectedLabels = this.selectedLabels.filter(l => l !== label);
    }
  }

  hasLabel(label: string): boolean {
    return this.selectedLabels.includes(label);
  }

  async handleFormSubmission(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;

    const nuevoProducto: NewProduct = {
      name: this.name,
      description: this.description,
      price: this.price!,
      categoryId: this.categoryId!,
      featured: this.featured,
      labels: this.selectedLabels,
      recommendedFor: this.recommendedFor || 1, // Envía 1 si está vacío
      discount: this.discount || 0,
      hasHappyHour: this.hasHappyHour,
    };

    let res;
    try {
      if (this.isEditMode && this.idproduct) {
        res = await this.productsService.editProduct({
          ...nuevoProducto,
          id: Number(this.idproduct)
        } as any);
      } else {
        res = await this.productsService.createProduct(nuevoProducto);
      }

      if (res) {
        this.router.navigate(["/admin-page/" + this.userId]);
      }
    } catch (e) {
      console.error("Error enviando formulario:", e);
    } finally {
      this.isLoading = false;
    }
  }
}