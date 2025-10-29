export interface Category {
  id: number;
  name: string;
  description?: string;
  restaurantId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  restaurantId: number;
}

export interface UpdateCategoryRequest {
  name: string;
  description?: string;
}
