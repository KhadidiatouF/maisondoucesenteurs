import { Injectable, computed, inject, signal } from '@angular/core';
import { STORE_CONFIG } from '../config/store.config';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { StorageService } from './storage.service';

const CART_STORAGE_KEY = 'maison-douce-senteur-cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storage = inject(StorageService);
  private readonly itemsSignal = signal<CartItem[]>(this.storage.get<CartItem[]>(CART_STORAGE_KEY, []));

  readonly items = this.itemsSignal.asReadonly();
  readonly subtotal = computed(() => this.itemsSignal().reduce((total, item) => total + item.product.price * item.quantity, 0));
  readonly deliveryFee = computed(() => (this.itemsSignal().length ? STORE_CONFIG.deliveryFee : 0));
  readonly total = computed(() => this.subtotal() + this.deliveryFee());
  readonly itemCount = computed(() => this.itemsSignal().reduce((count, item) => count + item.quantity, 0));

  addToCart(product: Product, quantity = 1): void {
    const existing = this.itemsSignal().find((item) => item.product.id === product.id);
    const nextItems = existing
      ? this.itemsSignal().map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        )
      : [...this.itemsSignal(), { product, quantity: Math.min(quantity, product.stock) }];

    this.commit(nextItems);
  }

  removeFromCart(productId: string): void {
    this.commit(this.itemsSignal().filter((item) => item.product.id !== productId));
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity < 1) {
      this.removeFromCart(productId);
      return;
    }

    this.commit(
      this.itemsSignal().map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stock) }
          : item
      )
    );
  }

  clearCart(): void {
    this.commit([]);
  }

  getItems(): CartItem[] {
    return this.itemsSignal();
  }

  getTotal(): number {
    return this.total();
  }

  getItemCount(): number {
    return this.itemCount();
  }

  private commit(items: CartItem[]): void {
    this.itemsSignal.set(items);
    this.storage.set(CART_STORAGE_KEY, items);
  }
}
