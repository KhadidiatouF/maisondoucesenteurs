import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-badge',
  standalone: true,
  imports: [RouterLink, FaIconComponent],
  template: `
    <a routerLink="/cart" class="cart-link" aria-label="Voir le panier">
      <fa-icon [icon]="faShoppingBag" aria-hidden="true" />
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
      justify-content: center;
      text-decoration: none;
      text-transform: uppercase;
    }

    fa-icon {
      font-size: 1.1rem;
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

    @media (max-width: 820px) {
      .cart-link {
        border-bottom: 1px solid var(--color-line);
        color: var(--color-ink);
        font-size: 1rem;
        font-weight: 900;
        justify-content: flex-start;
        letter-spacing: 0.04em;
        min-height: 52px;
        padding: 17px 4px;
      }

      strong {
        background: var(--color-primary);
        color: var(--color-gold);
      }
    }
  `
})
export class CartBadgeComponent {
  readonly faShoppingBag = faShoppingBag;

  constructor(readonly cart: CartService) {}
}
