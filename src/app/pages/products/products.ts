import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
        <p class="section-lead">Recherchez, filtrez par categorie et choisissez votre senteur avant de finaliser sur WhatsApp.</p>

        <div class="filters surface">
          <div class="field">
            <label for="search">Recherche</label>
            <input id="search" type="search" [(ngModel)]="searchTerm" placeholder="Nom, note, categorie...">
          </div>
          <div class="field">
            <label for="category">Categorie</label>
            <select id="category" [(ngModel)]="selectedCategory">
              <option value="">Toutes les categories</option>
              @for (category of categories; track category) {
                <option [value]="category">{{ category }}</option>
              }
            </select>
          </div>
          <div class="field">
            <label for="sort">Tri</label>
            <select id="sort" [(ngModel)]="sortBy">
              <option value="popular">Popularite</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix decroissant</option>
            </select>
          </div>
        </div>

        @if (filteredProducts().length) {
          <app-product-grid [products]="filteredProducts()" (add)="addToCart($event)" />
        } @else {
          <app-empty-state title="Aucun parfum trouve" description="Essayez une autre recherche ou retirez le filtre de categorie." />
        }
      </div>
    </section>
  `,
  styles: `
    .filters {
      display: grid;
      gap: 18px;
      grid-template-columns: 1.4fr 1fr 1fr;
      margin: 32px 0;
      padding: 20px;
    }

    @media (max-width: 820px) {
      .filters {
        grid-template-columns: 1fr;
      }
    }
  `
})
export class ProductsPage {
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartService);
  private readonly toast = inject(ToastService);

  private readonly products = this.productService.getProducts();
  readonly categories = this.productService.getCategories();
  searchTerm = '';
  selectedCategory = '';
  sortBy: SortOption = 'popular';

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
