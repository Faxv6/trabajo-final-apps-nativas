import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoriesService } from '../../services/categories-service';
import { NewCategory } from '../../interfaces/category';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Spinner } from '../spinner/spinner';
import { ProductsService } from '../../services/products-service';
import { NewProduct } from '../../interfaces/products';

@Component({
  selector: 'app-new-edit-category',
  imports: [CommonModule, FormsModule, Spinner, RouterLink],
  templateUrl: './new-edit-products.html',
  styleUrl: './new-edit-products.scss',
})


export class NewEditCategory {
  route = inject(ActivatedRoute);
  productService = inject(ProductsService)
  router = inject(Router);

  idCategory: string | null = null;
  isEditMode = false;
  isLoading = false;
  idProducto: string | null = null;


    @Input() initialName: string | null = null
    @Output() save = new EventEmitter<string>()
    @Output() cancel = new EventEmitter<void>()

    name: string | undefined


  async ngOnInit(): Promise < void> {

      this.idProducto = this.route.snapshot.paramMap.get('id');
      this.isEditMode = !!this.idCategory;

      if(this.isEditMode && this.idCategory) {
      await this.productService.getProducts();
      const idNum = +this.idCategory;
      const found = this.productService.products.find(c => c.id === idNum);
      if (found) this.name = found.name;
    }
  }
}
