import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { ProductCardComponent } from '../product-card/product-card';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    <div class="grid">
      @for (product of products; track product.id) {
        <app-product-card [product]="product" (add)="add.emit($event)" />
      }
    </div>
  `,
  styles: `
    .grid {
      display: grid;
      gap: 22px;
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    @media (max-width: 1000px) {
      .grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (max-width: 760px) {
      .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 520px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  `
})
export class ProductGridComponent {
  @Input({ required: true }) products: Product[] = [];
  @Output() add = new EventEmitter<Product>();
}
