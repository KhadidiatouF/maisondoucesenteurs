import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideMinus, LucidePlus } from '@lucide/angular';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  imports: [LucideMinus, LucidePlus],
  template: `
    <div class="quantity" aria-label="Selection de quantite">
      <button type="button" class="icon-btn" (click)="change(quantity - 1)" [disabled]="quantity <= min" aria-label="Diminuer la quantite">
        <svg lucideMinus size="16" aria-hidden="true"></svg>
      </button>
      <span>{{ quantity }}</span>
      <button type="button" class="icon-btn" (click)="change(quantity + 1)" [disabled]="quantity >= max" aria-label="Augmenter la quantite">
        <svg lucidePlus size="16" aria-hidden="true"></svg>
      </button>
    </div>
  `,
  styles: `
    .quantity {
      align-items: center;
      background: white;
      border: 1px solid var(--color-line);
      border-radius: 999px;
      display: inline-flex;
      gap: 4px;
      padding: 4px;
    }

    .icon-btn {
      align-items: center;
      background: var(--color-cream);
      border: 0;
      border-radius: 999px;
      cursor: pointer;
      display: inline-flex;
      height: 34px;
      justify-content: center;
      width: 34px;
    }

    .icon-btn:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    span {
      font-weight: 900;
      min-width: 32px;
      text-align: center;
    }
  `
})
export class QuantitySelectorComponent {
  @Input({ required: true }) quantity = 1;
  @Input() min = 1;
  @Input() max = 99;
  @Output() quantityChange = new EventEmitter<number>();

  change(value: number): void {
    this.quantityChange.emit(Math.min(Math.max(value, this.min), this.max));
  }
}
