import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faAward, faClock, faGift, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { ToastService } from '../../core/services/toast.service';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductGridComponent, FaIconComponent],
  template: `
    <section class="hero">
      <img class="hero-bg" src="assets/Escale Zanzibar, évasion parfumée.png" alt="Escale Zanzibar evasion parfumee">
      <div class="hero-overlay" aria-hidden="true"></div>
      <div class="container hero-content">
        <div class="hero-copy">
          <div class="hero-text">
            <p class="eyebrow">Création pour vous envoûter</p>
            <h1>Escale Zanzibar <em>évasion parfumée</em></h1>
            <p>Une fragrance lumineuse, florientale et enveloppante, imaginée pour laisser une présence douce et inoubliable.</p>
          </div>
          <div class="hero-actions">
            <a routerLink="/products" class="btn btn-primary">Découvrir la collection</a>
          </div>
        </div>
      </div>
    </section>

    <section class="hero-benefits" aria-label="Qualites Maison Douce Senteur">
      <div class="container benefit-grid">
        <article><fa-icon [icon]="faLeaf" aria-hidden="true" /><span>Ingrédients<br>soignés</span></article>
        <article><fa-icon [icon]="faClock" aria-hidden="true" /><span>Tenue longue<br>durée</span></article>
        <article><fa-icon [icon]="faAward" aria-hidden="true" /><span>Collection<br>signature</span></article>
        <article><fa-icon [icon]="faGift" aria-hidden="true" /><span>Écrin<br>soigné</span></article>
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
      border-bottom: 1px solid var(--color-line);
      overflow: hidden;
      min-height: 560px;
      padding: 0;
      position: relative;
    }

    .hero-bg,
    .hero-overlay {
      height: 100%;
      inset: 0;
      position: absolute;
      width: 100%;
    }

    .hero-bg {
      object-fit: cover;
      object-position: center;
      z-index: 0;
    }

    .hero-overlay {
      background: rgba(0, 0, 0, 0.56);
      z-index: 1;
    }

    .hero-content {
      align-items: center;
      display: flex;
      min-height: 560px;
      position: relative;
      z-index: 2;
    }

    .hero-copy {
      color: white;
      max-width: 620px;
    }

    .hero h1 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(3.2rem, 6vw, 6rem);
      font-weight: 700;
      line-height: 0.98;
      margin: 12px 0 20px;
    }

    .hero h1 em {
      display: block;
      font-style: italic;
      font-weight: 600;
    }

    .hero p:not(.eyebrow) {
      color: rgba(255, 255, 255, 0.9);
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.8;
      max-width: 500px;
    }

    .hero-text {
      display: grid;
      gap: 10px;
    }

    .hero .eyebrow {
      color: var(--color-gold);
      font-weight: 900;
    }

    .hero .btn-primary {
      background: #090806;
      box-shadow: none;
      min-width: 282px;
    }

    .hero-benefits {
      background: #fffdf6;
      border-bottom: 1px solid var(--color-line);
    }

    .benefit-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      min-height: 86px;
    }

    .benefit-grid article {
      align-items: center;
      color: var(--color-ink);
      display: flex;
      gap: 14px;
      justify-content: center;
      min-width: 0;
      text-transform: uppercase;
    }

    .benefit-grid fa-icon {
      color: var(--color-gold);
      font-size: 1.15rem;
      flex: 0 0 auto;
    }

    .benefit-grid span {
      font-size: 0.68rem;
      font-weight: 800;
      letter-spacing: 0.18em;
      line-height: 1.45;
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
      margin-top: 32px;
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
        color: white;
        min-height: 620px;
      }

      .hero-content {
        align-items: center;
        min-height: 620px;
        padding-top: 28px;
      }

      .hero-overlay {
        background: rgba(0, 0, 0, 0.64);
      }

      .hero h1 {
        font-size: clamp(2.25rem, 9.4vw, 3.45rem);
      }

      .hero p:not(.eyebrow) {
        color: rgba(255, 255, 255, 0.86);
      }

      .hero .btn-primary {
        min-width: 0;
        width: auto;
      }

      .hero-copy {
        align-items: flex-start;
        display: grid;
        gap: 18px;
        margin-top: 0;
      }

      .hero-text h1 {
        margin: 0;
      }

      .hero-text h1 em {
        display: block;
        font-style: italic;
        font-weight: 600;
      }

      .hero-text p:not(.eyebrow) {
        font-size: 1rem;
        font-weight: 650;
        line-height: 1.65;
        margin: 0;
      }

      .benefit-grid {
        grid-template-columns: repeat(2, 1fr);
        min-height: auto;
        padding: 14px 0;
      }

      .benefit-grid article {
        justify-content: flex-start;
        padding: 14px 0;
      }

      .benefit-grid span {
        font-size: 0.62rem;
      }

      .about-grid,
      .category-grid,
      .reasons,
      .promo {
        grid-template-columns: 1fr;
      }

      .category-strip {
        background: rgba(255, 255, 255, 0.9);
        gap: 10px;
        grid-template-columns: repeat(2, 1fr);
        margin-top: 24px;
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

  readonly faLeaf = faLeaf;
  readonly faClock = faClock;
  readonly faAward = faAward;
  readonly faGift = faGift;
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
