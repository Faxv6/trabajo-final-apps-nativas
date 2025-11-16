import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoriesService } from '../../services/categories-service';
import { NewCategory } from '../../interfaces/category';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Spinner } from '../spinner/spinner';

@Component({
  selector: 'app-new-edit-category',
  imports: [CommonModule, FormsModule, Spinner, RouterLink],
  templateUrl: './new-edit-products.html',
  styleUrl: './new-edit-products.scss',
})
export class NewEditCategory {
  categoriesService = inject(CategoriesService)
  route = inject(ActivatedRoute);
  router = inject(Router);

  idCategory: string | null = null;
  isEditMode = false;
  isLoading = false;



  @Input() initialName: string | null = null
  @Output() save = new EventEmitter<string>()
  @Output() cancel = new EventEmitter<void>()

  name: string | undefined

  async ngOnInit(): Promise<void> {

    this.idCategory = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.idCategory;

    if (this.isEditMode && this.idCategory) {
      await this.categoriesService.getCategories();
      const idNum = +this.idCategory;
      const found = this.categoriesService.categories.find(c => c.id === idNum);
      if (found) this.name = found.name;
    }
  }

  async handleFormSubmission(form: NgForm) {
    const nuevaCategoria: NewCategory = {
      name: form.value.name
    }
    this.isLoading = true;
    let res;
    if (this.isEditMode && this.idCategory) {
      res = await this.categoriesService.editCategory({ ...nuevaCategoria, id: Number(this.idCategory) } as any);
    } else {
      res = await this.categoriesService.createCategory(nuevaCategoria);
    }
    this.isLoading = false;
    if (!res) {
      return;
    }
    this.router.navigate(["/admin-page"]);
  }
}
