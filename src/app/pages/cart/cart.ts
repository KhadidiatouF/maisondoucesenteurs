import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideTrash2 } from '@lucide/angular';
import { CartService } from '../../core/services/cart.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state';
import { QuantitySelectorComponent } from '../../shared/components/quantity-selector/quantity-selector';
import { CurrencyFcfaPipe } from '../../shared/pipes/currency-fcfa.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, EmptyStateComponent, QuantitySelectorComponent, CurrencyFcfaPipe, LucideTrash2],
  template: `
    <section class="section">
      <div class="container">
        <p class="eyebrow">Panier</p>
        <h1 class="section-title">Votre commande</h1>

        @if (cart.items().length) {
          <div class="cart-layout">
            <div class="items">
              @for (item of cart.items(); track item.product.id) {
                <article class="cart-item surface">
                  <img [src]="item.product.image" [alt]="item.product.name">
                  <div>
                    <h2>{{ item.product.name }}</h2>
                    <p>{{ item.product.category }}</p>
                    <span class="price">{{ item.product.price | currencyFcfa }}</span>
                  </div>
                  <app-quantity-selector [quantity]="item.quantity" [max]="item.product.stock" (quantityChange)="cart.updateQuantity(item.product.id, $event)" />
                  <strong>{{ item.product.price * item.quantity | currencyFcfa }}</strong>
                  <button type="button" class="remove" (click)="cart.removeFromCart(item.product.id)" aria-label="Supprimer {{ item.product.name }}">
                    <svg lucideTrash2 size="18" aria-hidden="true"></svg>
                  </button>
                </article>
              }
            </div>

            <aside class="summary surface">
              <h2>Total panier</h2>
              <div><span>Sous-total</span><strong>{{ cart.subtotal() | currencyFcfa }}</strong></div>
              <div><span>Livraison</span><strong>{{ cart.deliveryFee() | currencyFcfa }}</strong></div>
              <div class="total"><span>Total</span><strong>{{ cart.total() | currencyFcfa }}</strong></div>
              <a routerLink="/checkout" class="btn btn-primary">Passer la commande</a>
              <a routerLink="/products" class="btn btn-secondary">Continuer mes achats</a>
            </aside>
          </div>
        } @else {
          <app-empty-state title="Votre panier est vide." description="Decouvrez nos parfums et ajoutez vos favoris." link="/products" linkLabel="Continuer mes achats" />
        }
      </div>
    </section>
  `,
  styles: `
    .cart-layout {
      align-items: start;
      display: grid;
      gap: 26px;
      grid-template-columns: 1fr 340px;
      margin-top: 30px;
    }

    .items {
      display: grid;
      gap: 14px;
    }

    .cart-item {
      align-items: center;
      display: grid;
      gap: 18px;
      grid-template-columns: 100px 1fr auto auto auto;
      padding: 14px;
    }

    img {
      aspect-ratio: 1;
      border-radius: 8px;
      object-fit: cover;
      width: 100px;
    }

    h2 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1.35rem;
      font-weight: 500;
      margin: 0 0 6px;
    }

    p {
      color: var(--color-muted);
      margin: 0 0 8px;
    }

    .remove {
      align-items: center;
      background: #fff3f0;
      border: 0;
      border-radius: 8px;
      color: #9f2d20;
      cursor: pointer;
      display: inline-flex;
      height: 42px;
      justify-content: center;
      width: 42px;
    }

    .summary {
      display: grid;
      gap: 16px;
      padding: 22px;
      position: sticky;
      top: 100px;
    }

    .summary div {
      display: flex;
      justify-content: space-between;
      gap: 16px;
    }

    .total {
      border-top: 1px solid var(--color-line);
      font-size: 1.2rem;
      padding-top: 16px;
    }

    @media (max-width: 900px) {
      .cart-layout {
        grid-template-columns: 1fr;
      }

      .summary {
        position: static;
      }
    }

    @media (max-width: 680px) {
      .cart-item {
        align-items: start;
        grid-template-columns: 82px 1fr;
      }

      .cart-item app-quantity-selector,
      .cart-item strong,
      .cart-item .remove {
        grid-column: 2;
      }

      img {
        width: 82px;
      }
    }
  `
})
export class CartPage {
  constructor(readonly cart: CartService) {}
}
