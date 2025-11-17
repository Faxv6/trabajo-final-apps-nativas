import { Injectable } from '@angular/core';
import { Products } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly URL_BASE = "https://w370351.ferozo.com";
  products: Products[] = []


  getProducts() {
    
  }
  getProductById() {

  }
  createProduct() {

  }
  editProduct() {

  }
  deleteProduct() {

  }

}
