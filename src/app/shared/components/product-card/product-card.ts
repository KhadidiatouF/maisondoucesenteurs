import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../../core/models/product.model';
import { CurrencyFcfaPipe } from '../../pipes/currency-fcfa.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CurrencyFcfaPipe, FaIconComponent],
  template: `
    <article class="product-card">
      <a [routerLink]="['/products', product.id]" class="image-link">
        <img [src]="product.image" [alt]="product.name" loading="lazy">
      </a>
      <div class="content">
        <p class="category">{{ product.category }}</p>
        <h3>{{ product.name }}</h3>
        <div class="meta">
          <strong class="price">{{ product.price | currencyFcfa }}</strong>
          @if (product.size) {
            <span class="size">{{ product.size }}</span>
          }
        </div>
        <div class="actions">
          <button type="button" class="btn btn-primary" (click)="add.emit(product)" [disabled]="product.stock < 1">
            <fa-icon [icon]="faShoppingBag" aria-hidden="true" />
            Ajouter
          </button>
          <a class="btn btn-secondary details" [routerLink]="['/products', product.id]" aria-label="Voir les details de {{ product.name }}">
            <fa-icon [icon]="faEye" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  `,
  styles: `
    .product-card {
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(215, 166, 66, 0.18);
      border-radius: 14px;
      box-shadow: 0 20px 60px rgba(6, 5, 4, 0.08);
      overflow: hidden;
      position: relative;
      transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
    }

    .product-card:hover {
      border-color: rgba(215, 166, 66, 0.42);
      box-shadow: 0 30px 76px rgba(6, 5, 4, 0.16);
      transform: translateY(-4px);
    }

    .image-link {
      aspect-ratio: 4 / 5;
      background: #fffaf0;
      display: block;
      overflow: hidden;
      position: relative;
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
      gap: 10px;
      padding: 18px;
    }

    .category {
      color: var(--color-primary);
      font-size: 0.68rem;
      font-weight: 900;
      letter-spacing: 0.11em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: uppercase;
      white-space: nowrap;
    }

    h3 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1.42rem;
      font-weight: 500;
      line-height: 1.12;
      margin: 0;
    }

    .meta {
      align-items: center;
      color: var(--color-muted);
      display: flex;
      justify-content: space-between;
      gap: 12px;
      border-top: 1px solid rgba(215, 166, 66, 0.22);
      min-height: 42px;
      padding-top: 12px;
    }

    .size {
      background: transparent;
      border: 1px solid rgba(215, 166, 66, 0.32);
      border-radius: 999px;
      color: var(--color-primary-dark);
      font-size: 0.82rem;
      font-weight: 900;
      padding: 6px 10px;
      white-space: nowrap;
    }

    .actions {
      display: grid;
      gap: 10px;
      grid-template-columns: 1fr 50px;
      margin-top: 2px;
    }

    .details {
      padding: 0;
    }

    .actions .btn {
      min-height: 44px;
    }

    .actions .btn-primary {
      background: var(--color-primary-dark);
      box-shadow: none;
    }

    .actions .btn-secondary {
      background: #fffaf0;
    }

    @media (max-width: 760px) {
      .product-card {
        border-color: rgba(215, 166, 66, 0.28);
        box-shadow: 0 16px 34px rgba(6, 5, 4, 0.1);
      }

      .image-link {
        aspect-ratio: 4 / 5;
      }

      .content {
        gap: 8px;
        padding: 12px;
      }

      .category {
        font-size: 0.65rem;
      }

      h3 {
        font-size: 1.08rem;
      }

      .meta {
        align-items: center;
        flex-direction: row;
        font-size: 0.86rem;
        gap: 8px;
        min-height: 36px;
        padding-top: 9px;
      }

      .actions {
        grid-template-columns: 1fr 42px;
      }

      .btn {
        min-height: 40px;
        padding: 0 10px;
      }

      .size {
        font-size: 0.72rem;
        padding: 5px 8px;
      }
    }
  `
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() add = new EventEmitter<Product>();
  readonly faShoppingBag = faShoppingBag;
  readonly faEye = faEye;
}
