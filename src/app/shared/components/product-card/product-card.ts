import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideEye, LucideShoppingBag } from '@lucide/angular';
import { Product } from '../../../core/models/product.model';
import { CurrencyFcfaPipe } from '../../pipes/currency-fcfa.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CurrencyFcfaPipe, LucideShoppingBag, LucideEye],
  template: `
    <article class="product-card">
      <a [routerLink]="['/products', product.id]" class="image-link">
        <img [src]="product.image" [alt]="product.name" loading="lazy">
      </a>
      <div class="content">
        <p class="category">{{ product.category }}</p>
        <h3>{{ product.name }}</h3>
        <div class="meta">
          <span class="price">{{ product.price | currencyFcfa }}</span>
          @if (product.size) {
            <span>{{ product.size }}</span>
          }
        </div>
        <div class="actions">
          <button type="button" class="btn btn-primary" (click)="add.emit(product)" [disabled]="product.stock < 1">
            <svg lucideShoppingBag size="17" aria-hidden="true"></svg>
            Ajouter
          </button>
          <a class="btn btn-secondary details" [routerLink]="['/products', product.id]" aria-label="Voir les details de {{ product.name }}">
            <svg lucideEye size="17" aria-hidden="true"></svg>
          </a>
        </div>
      </div>
    </article>
  `,
  styles: `
    .product-card {
      background: white;
      border: 1px solid var(--color-line);
      border-radius: 8px;
      overflow: hidden;
    }

    .image-link {
      aspect-ratio: 4 / 5;
      background: var(--color-cream);
      display: block;
      overflow: hidden;
    }

    img {
      height: 100%;
      object-fit: cover;
      transition: transform 240ms ease;
      width: 100%;
    }

    .product-card:hover img {
      transform: scale(1.04);
    }

    .content {
      display: grid;
      gap: 12px;
      padding: 18px;
    }

    .category {
      color: var(--color-gold);
      font-size: 0.78rem;
      font-weight: 900;
      letter-spacing: 0.08em;
      margin: 0;
      text-transform: uppercase;
    }

    h3 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1.35rem;
      font-weight: 500;
      margin: 0;
    }

    .meta {
      align-items: center;
      color: var(--color-muted);
      display: flex;
      justify-content: space-between;
      gap: 12px;
    }

    .actions {
      display: grid;
      gap: 10px;
      grid-template-columns: 1fr 50px;
    }

    .details {
      padding: 0;
    }
  `
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() add = new EventEmitter<Product>();
}
