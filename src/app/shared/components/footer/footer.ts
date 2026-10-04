import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { STORE_CONFIG } from '../../../core/config/store.config';
import { WhatsAppButtonComponent } from '../whatsapp-button/whatsapp-button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, WhatsAppButtonComponent],
  template: `
    <footer class="footer">
      <div class="container footer-grid">
        <section>
          <img class="footer-logo" src="assets/logo.png" alt="Maison Douce Senteur">
          <h2>{{ store.name }}</h2>
          <p>{{ store.slogan }}. Commandez vos favoris simplement via WhatsApp.</p>
          <app-whatsapp-button label="Commander sur WhatsApp" />
        </section>
        <section>
          <h3>Liens rapides</h3>
          <a routerLink="/">Accueil</a>
          <a routerLink="/products">Parfums</a>
          <a routerLink="/cart">Panier</a>
          <a routerLink="/contact">Contact</a>
        </section>
        <section>
          <h3>Contact</h3>
          <p>{{ store.phone }}</p>
          <p>{{ store.email }}</p>
          <p>{{ store.address }}</p>
        </section>
        <section>
          <h3>Horaires</h3>
          <p>{{ store.hours }}</p>
          <p>Instagram · Facebook · TikTok</p>
        </section>
      </div>
      <div class="container legal">© {{ currentYear }} {{ store.name }}. Tous droits reserves.</div>
    </footer>
  `,
  styles: `
    .footer {
      background: #211b18;
      color: white;
      padding: 56px 0 24px;
    }

    .footer-grid {
      display: grid;
      gap: 28px;
      grid-template-columns: 1.4fr 0.8fr 1fr 1fr;
    }

    .footer-logo {
      height: 88px;
      object-fit: contain;
      width: 88px;
    }

    h2, h3 {
      margin: 0 0 14px;
    }

    h2 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 2rem;
      font-weight: 500;
      margin-top: 18px;
    }

    h3 {
      color: white;
      font-size: inherit;
      font-weight: 700;
      letter-spacing: 0;
      text-transform: none;
    }

    p, a {
      color: rgba(255, 255, 255, 0.74);
      font-size: inherit;
      line-height: 1.7;
    }

    a {
      display: block;
      margin: 8px 0;
      text-decoration: none;
    }

    .legal {
      border-top: 1px solid rgba(255, 255, 255, 0.16);
      color: rgba(255, 255, 255, 0.58);
      font-size: inherit;
      letter-spacing: 0;
      margin-top: 36px;
      padding-top: 22px;
    }

    @media (max-width: 820px) {
      .footer-grid {
        grid-template-columns: 1fr;
      }
    }
  `
})
export class FooterComponent {
  readonly store = STORE_CONFIG;
  readonly currentYear = new Date().getFullYear();
}
