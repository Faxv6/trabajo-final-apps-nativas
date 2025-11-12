export interface Category {
  id: number|string;
  name: string;
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

