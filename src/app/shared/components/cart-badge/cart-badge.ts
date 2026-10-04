import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-badge',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a routerLink="/cart" class="cart-link" aria-label="Voir le panier">
      <span>Panier</span>
      @if (cart.itemCount() > 0) {
        <strong>{{ cart.itemCount() }}</strong>
      }
    </a>
  `,
  styles: `
    .cart-link {
      align-items: center;
      display: inline-flex;
      gap: 8px;
      text-decoration: none;
    }

    strong {
      align-items: center;
      background: var(--color-gold);
      border-radius: 999px;
      color: white;
      display: inline-flex;
      font-size: 0.78rem;
      height: 24px;
      justify-content: center;
      min-width: 24px;
      padding-inline: 7px;
    }
  `
})
export class CartBadgeComponent {
  constructor(readonly cart: CartService) {}
}
