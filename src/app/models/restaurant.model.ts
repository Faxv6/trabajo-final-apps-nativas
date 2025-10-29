export interface Restaurant {
  id: number;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  image?: string;
  ownerId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateRestaurantRequest {
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  image?: string;
}
