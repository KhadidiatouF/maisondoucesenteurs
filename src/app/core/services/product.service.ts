import { Injectable } from '@angular/core';
import { PRODUCTS } from '../data/products';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  getProducts(): Product[] {
    return PRODUCTS;
  }

  getPopularProducts(): Product[] {
    return PRODUCTS.filter((product) => product.isPopular);
  }

  getProductById(id: string): Product | undefined {
    return PRODUCTS.find((product) => product.id === id || product.slug === id);
  }

  getCategories(): string[] {
    return [...new Set(PRODUCTS.map((product) => product.category))];
  }
}
