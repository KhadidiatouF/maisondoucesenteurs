import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { ToastService } from '../../core/services/toast.service';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductGridComponent],
  template: `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">Maison Douce Senteur</p>
          <h1>Parfums delicats pour signer chaque moment.</h1>
          <p>Decouvrez une selection elegante de parfums, brumes, huiles parfumees et coffrets, puis commandez simplement via WhatsApp.</p>
          <div class="hero-actions">
            <a routerLink="/products" class="btn btn-primary">Decouvrir nos parfums</a>
            <a routerLink="/contact" class="btn btn-secondary">Nous contacter</a>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1100&q=85" alt="Flacons de parfum elegants sur une table claire">
      </div>
    </section>

    <section class="section">
      <div class="container section-head">
        <div>
          <p class="eyebrow">Selection</p>
          <h2 class="section-title">Produits populaires</h2>
          <p class="section-lead">Des senteurs choisies pour leur tenue, leur elegance et leur facilite a porter.</p>
        </div>
        <a routerLink="/products" class="btn btn-secondary">Voir tout</a>
      </div>
      <div class="container">
        <app-product-grid [products]="popularProducts" (add)="addToCart($event)" />
      </div>
    </section>

    <section class="section categories">
      <div class="container">
        <p class="eyebrow">Categories</p>
        <h2 class="section-title">Trouvez votre famille olfactive</h2>
        <div class="category-grid">
          @for (category of categories; track category) {
            <a routerLink="/products" [queryParams]="{ category }">{{ category }}</a>
          }
        </div>
      </div>
    </section>

    <section id="about" class="section about">
      <div class="container about-grid">
        <div>
          <p class="eyebrow">Pourquoi nous choisir</p>
          <h2 class="section-title">Une commande simple, un parfum qui reste.</h2>
          <p class="section-lead">Maison Douce Senteur met l accent sur des produits accessibles, bien presentes et une prise de commande rapide pour les clients mobiles.</p>
        </div>
        <div class="reasons">
          <article><strong>Produits de qualite</strong><span>Selections soignees et descriptions claires.</span></article>
          <article><strong>Livraison disponible</strong><span>Frais configures et visibles avant commande.</span></article>
          <article><strong>Commande WhatsApp</strong><span>Votre recapitulatif est prepare automatiquement.</span></article>
          <article><strong>Service reactif</strong><span>Une equipe disponible pour confirmer rapidement.</span></article>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="container">
        <p class="eyebrow">Pret a commander</p>
        <h2>Trouvez votre parfum prefere</h2>
        <a routerLink="/products" class="btn btn-primary">Choisir maintenant</a>
      </div>
    </section>
  `,
  styles: `
    .hero {
      background: var(--color-cream);
      padding: 56px 0 28px;
    }

    .hero-grid {
      align-items: center;
      display: grid;
      gap: 42px;
      grid-template-columns: 0.95fr 1.05fr;
    }

    .hero h1 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(3rem, 7vw, 5.8rem);
      font-weight: 500;
      line-height: 0.98;
      margin: 12px 0 20px;
    }

    .hero p:not(.eyebrow) {
      color: var(--color-muted);
      font-size: 1.1rem;
      line-height: 1.8;
      max-width: 580px;
    }

    .hero img {
      aspect-ratio: 5 / 4;
      border-radius: 8px;
      height: 100%;
      object-fit: cover;
      width: 100%;
    }

    .hero-actions,
    .section-head {
      align-items: center;
      display: flex;
      gap: 14px;
      justify-content: space-between;
    }

    .hero-actions {
      justify-content: flex-start;
      margin-top: 28px;
      flex-wrap: wrap;
    }

    .section-head {
      margin-bottom: 26px;
    }

    .categories {
      background: white;
      border-block: 1px solid var(--color-line);
    }

    .category-grid {
      display: grid;
      gap: 14px;
      grid-template-columns: repeat(3, 1fr);
      margin-top: 26px;
    }

    .category-grid a,
    .reasons article {
      background: var(--color-ivory);
      border: 1px solid var(--color-line);
      border-radius: 8px;
      padding: 22px;
      text-decoration: none;
    }

    .category-grid a {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1.35rem;
    }

    .about-grid {
      display: grid;
      gap: 34px;
      grid-template-columns: 0.9fr 1.1fr;
    }

    .reasons {
      display: grid;
      gap: 14px;
      grid-template-columns: repeat(2, 1fr);
    }

    .reasons article {
      display: grid;
      gap: 8px;
    }

    .reasons span {
      color: var(--color-muted);
      line-height: 1.6;
    }

    .cta {
      background: #211b18;
      color: white;
      padding: 72px 0;
      text-align: center;
    }

    .cta h2 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(2.4rem, 5vw, 4.5rem);
      font-weight: 500;
      margin: 10px 0 24px;
    }

    @media (max-width: 820px) {
      .hero-grid,
      .about-grid,
      .category-grid,
      .reasons {
        grid-template-columns: 1fr;
      }

      .section-head {
        align-items: flex-start;
        flex-direction: column;
      }
    }
  `
})
export class HomePage {
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartService);
  private readonly toast = inject(ToastService);

  readonly popularProducts = this.productService.getPopularProducts();
  readonly categories = this.productService.getCategories();

  addToCart(product: Product): void {
    this.cart.addToCart(product);
    this.toast.show('Produit ajoute au panier');
  }
}
