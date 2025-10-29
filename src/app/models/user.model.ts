export interface User {
  id: number;
  email: string;
  name: string;
  restaurantId?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  restaurantName: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
