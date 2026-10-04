import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { ToastService } from '../../core/services/toast.service';
import { CurrencyFcfaPipe } from '../../shared/pipes/currency-fcfa.pipe';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state';
import { QuantitySelectorComponent } from '../../shared/components/quantity-selector/quantity-selector';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink, CurrencyFcfaPipe, EmptyStateComponent, QuantitySelectorComponent],
  template: `
    @if (product(); as selectedProduct) {
      <section class="section details-page">
        <div class="container details-grid">
          <img [src]="selectedProduct.image" [alt]="selectedProduct.name">
          <div class="details">
            <a routerLink="/products" class="back">Retour aux parfums</a>
            <p class="eyebrow">{{ selectedProduct.category }}</p>
            <h1>{{ selectedProduct.name }}</h1>
            <p class="price">{{ selectedProduct.price | currencyFcfa }}</p>
            <p class="description">{{ selectedProduct.description }}</p>
            <dl>
              <div><dt>Contenance</dt><dd>{{ selectedProduct.size || 'Sur demande' }}</dd></div>
              <div><dt>Disponibilite</dt><dd>{{ selectedProduct.stock > 0 ? 'En stock' : 'Indisponible' }}</dd></div>
            </dl>
            @if (selectedProduct.notes) {
              <section class="notes" aria-labelledby="notes-title">
                <h2 id="notes-title">Notes olfactives</h2>
                <p><strong>Notes de tete :</strong> {{ selectedProduct.notes.top.join(', ') }}</p>
                <p><strong>Notes de coeur :</strong> {{ selectedProduct.notes.heart.join(', ') }}</p>
                <p><strong>Notes de fond :</strong> {{ selectedProduct.notes.base.join(', ') }}</p>
              </section>
            }
            <div class="purchase">
              <app-quantity-selector [quantity]="quantity()" [max]="selectedProduct.stock" (quantityChange)="quantity.set($event)" />
              <button class="btn btn-primary" type="button" (click)="addToCart(selectedProduct)" [disabled]="selectedProduct.stock < 1">Ajouter au panier</button>
            </div>
          </div>
        </div>
      </section>
    } @else {
      <div class="container">
        <app-empty-state eyebrow="Produit" title="Produit introuvable" description="Ce parfum n existe pas ou n est plus disponible." link="/products" linkLabel="Voir les parfums" />
      </div>
    }
  `,
  styles: `
    .details-grid {
      display: grid;
      gap: 44px;
      grid-template-columns: 1fr 1fr;
    }

    img {
      aspect-ratio: 4 / 5;
      border-radius: 8px;
      height: auto;
      object-fit: cover;
      width: 100%;
    }

    .back {
      color: var(--color-muted);
      display: inline-block;
      font-weight: 800;
      margin-bottom: 24px;
      text-decoration: none;
    }

    h1 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(2.6rem, 5vw, 4.8rem);
      font-weight: 500;
      line-height: 1;
      margin: 10px 0 16px;
    }

    .price {
      font-size: 1.45rem;
      margin: 0 0 20px;
    }

    .description {
      color: var(--color-muted);
      font-size: 1.05rem;
      line-height: 1.8;
    }

    dl {
      display: grid;
      gap: 12px;
      grid-template-columns: repeat(2, 1fr);
      margin: 28px 0;
    }

    dl div,
    .notes {
      background: white;
      border: 1px solid var(--color-line);
      border-radius: 8px;
      padding: 18px;
    }

    dt {
      color: var(--color-muted);
      font-size: 0.85rem;
      font-weight: 800;
    }

    dd {
      margin: 6px 0 0;
      font-weight: 900;
    }

    .notes h2 {
      margin-top: 0;
    }

    .notes p {
      color: var(--color-muted);
      line-height: 1.7;
    }

    .purchase {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      margin-top: 26px;
    }

    @media (max-width: 820px) {
      .details-grid,
      dl {
        grid-template-columns: 1fr;
      }
    }
  `
})
export class ProductDetailsPage {
  readonly quantity = signal(1);
  readonly product = computed(() => {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    return this.productService.getProductById(id);
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly cart: CartService,
    private readonly toast: ToastService
  ) {}

  addToCart(product: Product): void {
    this.cart.addToCart(product, this.quantity());
    this.toast.show('Produit ajoute au panier');
  }
}
