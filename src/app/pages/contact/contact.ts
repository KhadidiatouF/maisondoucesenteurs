import { Component } from '@angular/core';
import { STORE_CONFIG } from '../../core/config/store.config';
import { WhatsAppButtonComponent } from '../../shared/components/whatsapp-button/whatsapp-button';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [WhatsAppButtonComponent],
  template: `
    <section class="section contact-page">
      <div class="container contact-grid">
        <div>
          <p class="eyebrow">Contact</p>
          <h1 class="section-title">Une question sur une senteur ?</h1>
          <p class="section-lead">Ecrivez-nous pour verifier la disponibilite, demander un conseil ou organiser une livraison.</p>
          <app-whatsapp-button label="Discuter sur WhatsApp" />
        </div>

        <div class="surface contact-card">
          <h2>{{ store.name }}</h2>
          <p><strong>Téléphone</strong><span>{{ store.phone }}</span></p>
          <p><strong>WhatsApp</strong><span>{{ store.phone }}</span></p>
          <p><strong>Email</strong><span>{{ store.email }}</span></p>
          <p><strong>Adresse</strong><span>{{ store.address }}</span></p>
          <p><strong>Horaires</strong><span>{{ store.hours }}</span></p>
        </div>
      </div>
    </section>
  `,
  styles: `
    .contact-grid {
      align-items: start;
      display: grid;
      gap: 36px;
      grid-template-columns: 1fr 420px;
    }

    .contact-card {
      display: grid;
      gap: 16px;
      padding: 26px;
    }

    h2 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 2rem;
      font-weight: 500;
      margin: 0;
    }

    p {
      display: grid;
      gap: 6px;
      margin: 0;
    }

    span {
      color: var(--color-muted);
    }

    @media (max-width: 820px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
    }
  `
})
export class ContactPage {
  readonly store = STORE_CONFIG;
}
