import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Spinner } from '../spinner/spinner';

@Component({
  selector: 'app-new-edit-category',
  imports: [CommonModule, FormsModule, Spinner],
  templateUrl: './new-edit-category.html',
  styleUrl: './new-edit-category.scss',
})
export class NewEditCategory {
  categoriesService = inject(CategoriesService)
  route = inject(ActivatedRoute);
  router = inject(Router);

  idContacto: string | null = null;
  isEditMode = false;

  isLoading = false;



  @Input() initialName: string | null = null
  @Output() save = new EventEmitter<string>()
  @Output() cancel = new EventEmitter<void>()

  name: string = ''

  ngOnInit(): void {
    if (this.initialName) this.name = this.initialName

    this.idContacto = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.idContacto;
  }

  onSubmit() {
    this.isLoading = true;
    const trimmed = (this.name ?? '').trim();
    if (!trimmed) {
      this.isLoading = false;
      return;
    }
    this.save.emit(trimmed);
    this.categoriesService.createCategory({ name: trimmed });
    this.isLoading = false;
    this.router.navigate(['/admin-page']);
  }

  onCancel() {
    this.cancel.emit()
  }
}
