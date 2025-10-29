export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
  categoryId: number;
  restaurantId: number;
  isFeatured: boolean;
  isActive: boolean;
  discount: number; // Porcentaje de descuento 0-100
  hasHappyHour: boolean;
  happyHourStart?: string; // Formato HH:mm
  happyHourEnd?: string; // Formato HH:mm
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  image?: string;
  categoryId: number;
  restaurantId: number;
  isFeatured?: boolean;
  isActive?: boolean;
}

export interface UpdateProductRequest {
  name: string;
  description?: string;
  price: number;
  image?: string;
  categoryId: number;
  isFeatured?: boolean;
  isActive?: boolean;
}

export interface UpdateProductDiscountRequest {
  discount: number;
}

export interface UpdateProductHappyHourRequest {
  hasHappyHour: boolean;
  happyHourStart?: string;
  happyHourEnd?: string;
}
