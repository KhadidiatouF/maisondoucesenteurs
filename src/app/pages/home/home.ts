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
          <h1>Une fragrance qui vous revele.</h1>
          <p>Découvrez une sélection élégante de parfums, brumes, huiles parfumées et coffrets, puis commandez simplement via WhatsApp.</p>
          <div class="hero-actions">
            <a routerLink="/products" class="btn btn-primary">Decouvrir nos parfums</a>
            <a routerLink="/contact" class="btn btn-secondary">Nous contacter</a>
          </div>
        </div>
        <div class="hero-visual">
          <img src="/assets/escale-zanzibar-florientale.png" alt="Parfum Escale Zanzibar elegance florientale">
        </div>
      </div>
    </section>

    <section class="container category-strip" aria-label="Collections rapides">
      @for (category of categories; track category) {
        <a routerLink="/products" [queryParams]="{ category }">
          <span class="collection-thumb">
            <img [src]="collectionImage(category)" [alt]="category">
          </span>
          <strong>{{ category }}</strong>
        </a>
      }
    </section>

    <section class="section">
      <div class="container section-head">
        <div>
          <p class="eyebrow">Sélection</p>
          <h2 class="section-title">Produits populaires</h2>
          <p class="section-lead">Des senteurs choisies pour leur tenue, leur elegance et leur facilite a porter.</p>
        </div>
        <a routerLink="/products" class="btn btn-secondary">Voir tout</a>
      </div>
      <div class="container">
        <app-product-grid [products]="popularProducts" (add)="addToCart($event)" />
      </div>
    </section>

    <section class="container promo">
      <img src="assets/Collection zanzibar/zan.jpeg" alt="Parfum Escale Zanzibar Maison Douce Senteur">
      <div>
        <p class="eyebrow">Offre limitee</p>
        <h2>Profitez de 15% sur votre premiere commande</h2>
        <p>Utilisez le code BIENVENUE15 au moment de confirmer votre commande avec notre equipe.</p>
        <a routerLink="/products" class="btn btn-primary">Commander</a>
      </div>
    </section>

    <section class="section categories">
      <div class="container">
        <p class="eyebrow">Collections</p>
        <h2 class="section-title">Explorez nos collections signature</h2>
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
          <article><strong>Produits de qualité</strong><span>Sélections soignées et descriptions claires.</span></article>
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
      background: #fffdf6;
      border-bottom: 1px solid var(--color-line);
      overflow: hidden;
      padding: 68px 0 78px;
    }

    .hero-grid {
      align-items: center;
      display: grid;
      gap: 42px;
      grid-template-columns: 0.95fr 1.05fr;
    }

    .hero h1 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(3.4rem, 7vw, 6.3rem);
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

    .hero-visual {
      background: #fff8df;
      border-radius: 8px;
      box-shadow: var(--shadow-soft);
      padding: 16px;
    }

    .hero-visual img {
      aspect-ratio: 4 / 5;
      background: #fffaf0;
      border-radius: 8px;
      height: 100%;
      object-fit: contain;
      width: 100%;
    }

    .category-strip {
      background: rgba(255, 255, 255, 0.76);
      backdrop-filter: blur(18px);
      border: 1px solid rgba(215, 166, 66, 0.25);
      border-radius: 14px;
      box-shadow: 0 28px 80px rgba(6, 5, 4, 0.12);
      display: grid;
      gap: 14px;
      grid-template-columns: repeat(6, 1fr);
      margin-top: -42px;
      padding: 14px;
      position: relative;
      z-index: 3;
    }

    .category-strip a {
      color: var(--color-muted);
      display: block;
      min-height: 150px;
      overflow: hidden;
      position: relative;
      text-decoration: none;
      border-radius: 12px;
      isolation: isolate;
    }

    .category-strip span {
      display: block;
      height: 150px;
      width: 100%;
    }

    .collection-thumb img {
      height: 100%;
      object-fit: cover;
      transition: transform 260ms ease;
      width: 100%;
    }

    .category-strip strong {
      background: rgba(5, 4, 3, 0.72);
      bottom: 0;
      color: white;
      display: flex;
      font-size: 0.78rem;
      font-weight: 900;
      inset-inline: 0;
      letter-spacing: 0.02em;
      line-height: 1.25;
      min-height: 72px;
      padding: 28px 10px 10px;
      position: absolute;
      text-shadow: 0 2px 12px rgba(0, 0, 0, 0.34);
      z-index: 2;
    }

    .category-strip a:hover img {
      transform: scale(1.06);
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

    .promo {
      align-items: center;
      background: #fff8df;
      border: 1px solid var(--color-line);
      border-radius: 8px;
      box-shadow: var(--shadow-soft);
      display: grid;
      gap: 34px;
      grid-template-columns: 0.9fr 1fr;
      margin-bottom: 64px;
      padding: 22px;
    }

    .promo img {
      aspect-ratio: 16 / 7;
      border-radius: 8px;
      height: 100%;
      object-fit: cover;
      width: 100%;
    }

    .promo h2 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(2rem, 4vw, 3.2rem);
      font-weight: 500;
      line-height: 1.05;
      margin: 8px 0 10px;
    }

    .promo p:not(.eyebrow) {
      color: var(--color-muted);
      line-height: 1.7;
      margin-bottom: 20px;
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
      background: var(--color-primary-dark);
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
      .hero {
        background: #090806;
        color: white;
        padding: 32px 0 42px;
      }

      .hero h1 {
        font-size: clamp(2.8rem, 14vw, 4.6rem);
      }

      .hero p:not(.eyebrow) {
        color: rgba(255, 255, 255, 0.86);
      }

      .hero .eyebrow {
        color: white;
      }

      .hero-visual {
        background: rgba(255, 255, 255, 0.2);
        box-shadow: none;
        padding: 10px;
      }

      .hero-visual img {
        aspect-ratio: 4 / 5;
        object-fit: contain;
      }

      .hero-grid,
      .about-grid,
      .category-grid,
      .reasons,
      .promo {
        grid-template-columns: 1fr;
      }

      .hero-visual {
        order: -1;
      }

      .category-strip {
        background: rgba(255, 255, 255, 0.9);
        gap: 10px;
        grid-template-columns: repeat(2, 1fr);
        margin-top: -24px;
      }

      .category-strip a {
        min-height: 132px;
      }

      .category-strip span {
        height: 132px;
      }

      .category-strip strong {
        font-size: 0.74rem;
      }

      .promo {
        background: #fff8df;
        margin-bottom: 42px;
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
  private readonly products = this.productService.getProducts();
  readonly categories = this.productService.getCategories();

  collectionImage(category: string): string {
    return this.products.find((product) => product.category === category)?.image ?? '/assets/escale-zanzibar-florientale.png';
  }

  addToCart(product: Product): void {
    this.cart.addToCart(product);
    this.toast.show('Produit ajoute au panier');
  }
}
