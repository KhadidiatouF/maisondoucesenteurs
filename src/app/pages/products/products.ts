import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { ToastService } from '../../core/services/toast.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid';

type SortOption = 'popular' | 'price-asc' | 'price-desc';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, ProductGridComponent, EmptyStateComponent],
  template: `
    <section class="section products-page">
      <div class="container">
        <p class="eyebrow">Catalogue</p>
        <h1 class="section-title">Tous nos parfums</h1>
        <p class="section-lead">Recherchez, filtrez par collection et choisissez votre senteur avant de finaliser sur WhatsApp.</p>

        <div class="filters-panel">
          <div class="filter-main">
            <div class="field search-field">
              <label for="search">Recherche</label>
              <input id="search" type="search" [(ngModel)]="searchTerm" placeholder="Nom, note, collection...">
            </div>
            <div class="field">
              <label for="category">Collection</label>
              <select id="category" [(ngModel)]="selectedCategory">
                <option value="">Toutes les collections</option>
                @for (category of categories; track category) {
                  <option [value]="category">{{ category }}</option>
                }
              </select>
            </div>
            <div class="field">
              <label for="sort">Tri</label>
              <select id="sort" [(ngModel)]="sortBy">
                <option value="popular">Popularité</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
            </div>
          </div>

          <div class="collection-chips" aria-label="Filtrer par collection">
            <button type="button" [class.active]="!selectedCategory" (click)="selectedCategory = ''">Toutes</button>
            @for (category of categories; track category) {
              <button type="button" [class.active]="selectedCategory === category" (click)="selectedCategory = category">{{ category }}</button>
            }
          </div>
        </div>

        @if (selectedCategory && collectionGallery().length) {
          <section class="collection-preview" aria-labelledby="collection-preview-title">
            <div class="preview-head">
              <div>
                <p class="eyebrow">Aperçu collection</p>
                <h2 id="collection-preview-title">{{ selectedCategory }}</h2>
              </div>
              <span>{{ collectionGallery().length }} visuels</span>
            </div>
            <div class="preview-grid">
              @for (image of collectionGallery(); track image) {
                <img [src]="image" [alt]="selectedCategory">
              }
            </div>
          </section>
        }

        @if (filteredProducts().length) {
          <app-product-grid [products]="filteredProducts()" (add)="addToCart($event)" />
        } @else {
          <app-empty-state title="Aucun parfum trouve" description="Essayez une autre recherche ou retirez le filtre de collection." />
        }
      </div>
    </section>
  `,
  styles: `
    .products-page {
      background: transparent;
    }

    .filters-panel {
      background: #fffdf6;
      border: 1px solid var(--color-line);
      border-radius: 14px;
      box-shadow: 0 20px 60px rgba(6, 5, 4, 0.07);
      display: grid;
      gap: 18px;
      margin: 32px 0;
      padding: 18px;
    }

    .filter-main {
      display: grid;
      gap: 18px;
      grid-template-columns: 1.4fr 1fr 1fr;
    }

    .filters-panel :is(input, select) {
      background: white;
      border-radius: 999px;
    }

    .collection-chips {
      border-top: 1px solid var(--color-line);
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      padding-top: 16px;
    }

    .collection-chips button {
      background: white;
      border: 1px solid var(--color-line);
      border-radius: 999px;
      color: var(--color-muted);
      cursor: pointer;
      font-weight: 800;
      min-height: 38px;
      padding: 0 14px;
    }

    .collection-chips button.active,
    .collection-chips button:hover {
      background: #0b0a08;
      border-color: #0b0a08;
      color: #f4d26f;
    }

    .collection-preview {
      background: #0b0a08;
      border: 1px solid rgba(215, 166, 66, 0.34);
      border-radius: 14px;
      color: white;
      margin: 0 0 32px;
      padding: 18px;
    }

    .preview-head {
      align-items: end;
      display: flex;
      justify-content: space-between;
      gap: 18px;
      margin-bottom: 16px;
    }

    .preview-head h2 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(1.8rem, 4vw, 3rem);
      font-weight: 500;
      margin: 6px 0 0;
    }

    .preview-head span {
      color: #f4d26f;
      font-weight: 900;
      white-space: nowrap;
    }

    .preview-grid {
      display: grid;
      gap: 12px;
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }

    .preview-grid img {
      aspect-ratio: 4 / 5;
      border-radius: 10px;
      height: 100%;
      object-fit: cover;
      width: 100%;
    }

    @media (max-width: 820px) {
      .products-page {
        background: transparent;
      }

      .filter-main {
        grid-template-columns: 1fr;
      }

      .filters-panel {
        margin: 24px 0;
        padding: 14px;
      }

      .collection-chips {
        flex-wrap: nowrap;
        overflow-x: auto;
        padding-bottom: 2px;
      }

      .collection-chips button {
        flex: 0 0 auto;
      }

      .preview-head {
        align-items: flex-start;
        flex-direction: column;
      }

      .preview-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  `
})
export class ProductsPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartService);
  private readonly toast = inject(ToastService);

  private readonly products = this.productService.getProducts();
  readonly categories = this.productService.getCategories();
  searchTerm = '';
  selectedCategory = '';
  sortBy: SortOption = 'popular';

  private readonly collectionImages: Record<string, string[]> = {
    'Gold Elixir': [
      'assets/Collection gold elixir/collection gold elixir.jpeg'
    ],
    'Trio Zanzibar Maison': [
      'assets/Collection trio zanzibar maison/Trio zanzibar maison.jpeg',
      'assets/Collection trio zanzibar maison/Sans titre.jpeg',
      'assets/Collection trio zanzibar maison/trio.jpeg',
      'assets/Collection trio zanzibar maison/triomaison.jpeg',
      'assets/Collection trio zanzibar maison/trioprice.jpeg'
    ],
    'Collection evasion - Escale Zanzibar': [
      'assets/Collection zanzibar/escal.jpeg',
      'assets/Collection zanzibar/zanzibar1.jpeg',
      'assets/Collection zanzibar/descrip.jpeg',
      'assets/Collection zanzibar/escalenotes.jpeg',
      'assets/Collection zanzibar/escaleprice.jpeg',
      'assets/Collection zanzibar/fusionnotes.jpeg',
      'assets/Collection zanzibar/zan.jpeg'
    ],
    'Collection ravage d ete': [
      "assets/Collection ravage d'ete/Collection ravage d'été.jpeg",
      "assets/Collection ravage d'ete/rav.jpeg",
      "assets/Collection ravage d'ete/ravag.jpeg",
      "assets/Collection ravage d'ete/ravage.jpeg",
      "assets/Collection ravage d'ete/ravageprice.jpeg"
    ],
    'Collection ravage': [
      'assets/Collection ravage/collection ravage.jpeg',
      'assets/Collection ravage/rav1.jpeg',
      'assets/Collection ravage/ravag1.jpeg',
      'assets/Collection ravage/ravage1.jpeg',
      'assets/Collection ravage/ravageprice1.jpeg'
    ],
    'Collection Taaru Mbeuguel': [
      'assets/Collection Taaru mbeuguel/collection taaru mbeuguel.jpeg',
      'assets/Collection Taaru mbeuguel/taar.jpeg',
      'assets/Collection Taaru mbeuguel/taarprice.jpeg',
      'assets/Collection Taaru mbeuguel/tar.jpeg',
      'assets/Collection Taaru mbeuguel/taru.jpeg'
    ]
  };

  ngOnInit(): void {
    this.selectedCategory = this.route.snapshot.queryParamMap.get('category') ?? '';
  }

  collectionGallery(): string[] {
    return this.collectionImages[this.selectedCategory] ?? [];
  }

  filteredProducts(): Product[] {
    const term = this.searchTerm.trim().toLowerCase();
    const category = this.selectedCategory;

    return this.products
      .filter((product) => {
        const notes = product.notes ? [...product.notes.top, ...product.notes.heart, ...product.notes.base].join(' ') : '';
        const haystack = `${product.name} ${product.category} ${product.description} ${notes}`.toLowerCase();
        return (!term || haystack.includes(term)) && (!category || product.category === category);
      })
      .sort((a, b) => {
        if (this.sortBy === 'price-asc') return a.price - b.price;
        if (this.sortBy === 'price-desc') return b.price - a.price;
        return Number(b.isPopular) - Number(a.isPopular);
      });
  }

  addToCart(product: Product): void {
    this.cart.addToCart(product);
    this.toast.show('Produit ajoute au panier');
  }
}
