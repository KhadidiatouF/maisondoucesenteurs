import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { WhatsAppService } from '../../core/services/whatsapp.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state';
import { CurrencyFcfaPipe } from '../../shared/pipes/currency-fcfa.pipe';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, EmptyStateComponent, CurrencyFcfaPipe],
  template: `
    <section class="section">
      <div class="container">
        @if (cart.items().length) {
          <p class="eyebrow">Finalisation</p>
          <h1 class="section-title">Commander sur WhatsApp</h1>
          <p class="section-lead">Renseignez vos informations. Le recapitulatif sera prepare automatiquement avant l ouverture de WhatsApp.</p>

          @if (confirmationVisible()) {
            <div class="confirmation surface">
              <strong>Votre commande est prete !</strong>
              <span>Nous avons prepare votre recapitulatif. Envoyez-le sur WhatsApp pour confirmer votre commande avec notre equipe.</span>
            </div>
          }

          <div class="checkout-layout">
            <form class="surface" [formGroup]="form" (ngSubmit)="submit()" novalidate>
              <div class="field">
                <label for="fullName">Nom complet</label>
                <input id="fullName" type="text" formControlName="fullName" autocomplete="name">
                @if (hasError('fullName', 'required')) {
                  <span class="error">Le nom complet est obligatoire.</span>
                }
              </div>

              <div class="field">
                <label for="phone">Téléphone</label>
                <input id="phone" type="tel" formControlName="phone" autocomplete="tel" placeholder="77 000 00 00">
                @if (hasError('phone', 'required')) {
                  <span class="error">Le telephone est obligatoire.</span>
                } @else if (hasError('phone', 'pattern')) {
                  <span class="error">Indiquez un numero coherent.</span>
                }
              </div>

              <div class="field">
                <label for="address">Adresse</label>
                <input id="address" type="text" formControlName="address" autocomplete="street-address">
                @if (hasError('address', 'required')) {
                  <span class="error">L adresse est obligatoire.</span>
                }
              </div>

              <div class="field">
                <label for="city">Ville / quartier</label>
                <input id="city" type="text" formControlName="city" autocomplete="address-level2">
                @if (hasError('city', 'required')) {
                  <span class="error">La ville ou le quartier est obligatoire.</span>
                }
              </div>

              <div class="field">
                <label for="note">Note ou precision facultative</label>
                <textarea id="note" formControlName="note" rows="4"></textarea>
              </div>

              <button class="btn btn-primary" type="submit">Commander sur WhatsApp</button>
            </form>

            <aside class="surface summary" aria-labelledby="summary-title">
              <h2 id="summary-title">Votre commande</h2>
              @for (item of cart.items(); track item.product.id) {
                <div class="summary-line">
                  <span>{{ item.product.name }} x {{ item.quantity }}</span>
                  <strong>{{ item.product.price * item.quantity | currencyFcfa }}</strong>
                </div>
              }
              <div class="summary-line total-separator">
                <span>Sous-total</span>
                <strong>{{ cart.subtotal() | currencyFcfa }}</strong>
              </div>
              <div class="summary-line">
                <span>Livraison</span>
                <strong>{{ cart.deliveryFee() | currencyFcfa }}</strong>
              </div>
              <div class="summary-line grand-total">
                <span>Total</span>
                <strong>{{ cart.total() | currencyFcfa }}</strong>
              </div>
            </aside>
          </div>
        } @else {
          <app-empty-state title="Votre panier est vide." description="Ajoutez un parfum avant de finaliser votre commande." link="/products" linkLabel="Voir les parfums" />
        }
      </div>
    </section>
  `,
  styles: `
    .confirmation {
      align-items: center;
      display: grid;
      gap: 6px;
      margin: 26px 0;
      padding: 18px;
    }

    .confirmation span {
      color: var(--color-muted);
    }

    .checkout-layout {
      align-items: start;
      display: grid;
      gap: 28px;
      grid-template-columns: minmax(0, 1fr) 380px;
      margin-top: 30px;
    }

    form,
    .summary {
      display: grid;
      gap: 18px;
      padding: 24px;
    }

    .summary {
      position: sticky;
      top: 100px;
    }

    h2 {
      margin: 0 0 4px;
    }

    .summary-line {
      display: flex;
      gap: 16px;
      justify-content: space-between;
    }

    .total-separator {
      border-top: 1px solid var(--color-line);
      padding-top: 16px;
    }

    .grand-total {
      font-size: 1.22rem;
    }

    @media (max-width: 900px) {
      .checkout-layout {
        grid-template-columns: 1fr;
      }

      .summary {
        position: static;
      }
    }
  `
})
export class CheckoutPage {
  readonly cart = inject(CartService);
  private readonly fb = inject(FormBuilder);
  private readonly whatsapp = inject(WhatsAppService);
  private readonly router = inject(Router);

  readonly confirmationVisible = signal(false);
  readonly canSubmit = computed(() => this.cart.items().length > 0);

  readonly form = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^[+0-9 ()-]{7,20}$/)]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    note: ['']
  });

  hasError(controlName: keyof typeof this.form.controls, error: string): boolean {
    const control = this.form.controls[controlName];
    return control.hasError(error) && (control.dirty || control.touched);
  }

  submit(): void {
    if (!this.canSubmit()) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const url = this.whatsapp.buildOrderUrl(
      this.cart.items(),
      this.form.getRawValue(),
      this.cart.subtotal(),
      this.cart.deliveryFee(),
      this.cart.total()
    );

    this.confirmationVisible.set(true);
    window.open(url, '_blank', 'noopener');
    this.cart.clearCart();
    this.router.navigateByUrl('/products');
  }
}
