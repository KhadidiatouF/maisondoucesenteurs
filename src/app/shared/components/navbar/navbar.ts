import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { STORE_CONFIG } from '../../../core/config/store.config';
import { CartBadgeComponent } from '../cart-badge/cart-badge';
import { WhatsAppButtonComponent } from '../whatsapp-button/whatsapp-button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CartBadgeComponent, WhatsAppButtonComponent, FaIconComponent],
  template: `
    <header class="site-header">
      <div class="top-strip">
        <div class="container strip-inner">
          <span>Livraison disponible a Dakar</span>
          <span>Commande simple sur WhatsApp</span>
          <span>Maison Douce Senteur</span>
        </div>
      </div>
      <nav class="container nav" aria-label="Navigation principale">
        <a routerLink="/" class="brand" (click)="closeMenu()">
          <span class="brand-mark" aria-hidden="true">
            <img src="assets/logo.png" alt="">
          </span>
          <span>{{ store.name }}</span>
        </a>

        <button class="icon-btn menu-btn" type="button" (click)="toggleMenu()" [attr.aria-expanded]="isOpen()" aria-label="Ouvrir le menu">
          @if (isOpen()) {
            <fa-icon [icon]="faXmark" aria-hidden="true" />
          } @else {
            <fa-icon [icon]="faBars" aria-hidden="true" />
          }
        </button>

        <div class="links" [class.open]="isOpen()">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="closeMenu()">Accueil</a>
          <a routerLink="/products" routerLinkActive="active" (click)="closeMenu()">Parfums</a>
          <a routerLink="/" fragment="about" (click)="closeMenu()">A propos</a>
          <a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">Contact</a>
          <app-cart-badge />
          <app-whatsapp-button label="WhatsApp" />
        </div>
      </nav>
    </header>
  `,
  styles: `
    .site-header {
      backdrop-filter: blur(18px);
      background: rgba(255, 253, 246, 0.92);
      border-bottom: 1px solid var(--color-line);
      position: sticky;
      top: 0;
      z-index: 20;
    }

    .top-strip {
      background: var(--color-primary-dark);
      color: white;
      font-size: 0.78rem;
      font-weight: 800;
    }

    .strip-inner {
      align-items: center;
      display: flex;
      justify-content: space-between;
      min-height: 30px;
      gap: 16px;
    }

    .nav {
      align-items: center;
      display: flex;
      min-height: 82px;
      justify-content: space-between;
      gap: 24px;
    }

    .brand {
      align-items: center;
      display: inline-flex;
      font-weight: 900;
      gap: 12px;
      letter-spacing: 0;
      text-decoration: none;
      white-space: nowrap;
    }

    .brand-mark {
      align-items: center;
      background: #050303;
      border-radius: 10px;
      border: 1px solid rgba(215, 166, 66, 0.34);
      box-shadow: 0 12px 28px rgba(6, 5, 4, 0.18);
      display: inline-flex;
      height: 56px;
      justify-content: center;
      overflow: hidden;
      padding: 4px;
      width: 56px;
    }

    .brand-mark img {
      height: 100%;
      object-fit: contain;
      width: 100%;
    }

    .links {
      align-items: center;
      display: flex;
      gap: 24px;
    }

    .links a {
      color: var(--color-muted);
      font-weight: 800;
      text-decoration: none;
    }

    .links a.active,
    .links a:hover {
      color: var(--color-primary);
    }

    .icon-btn {
      align-items: center;
      background: white;
      border: 1px solid var(--color-line);
      border-radius: 8px;
      cursor: pointer;
      display: inline-flex;
      height: 44px;
      justify-content: center;
      width: 44px;
    }

    .menu-btn {
      display: none;
    }

    @media (max-width: 820px) {
      .site-header {
        background: rgba(255, 253, 246, 0.94);
      }

      .top-strip {
        display: none;
      }

      .nav {
        min-height: 70px;
      }

      .brand {
        gap: 9px;
      }

      .brand > span:last-child {
        font-size: 0.9rem;
      }

      .brand-mark {
        height: 46px;
        width: 46px;
      }

      .menu-btn {
        display: inline-flex;
        background: var(--color-primary);
        color: white;
      }

      .links {
        align-items: stretch;
        background: #fffdf6;
        border-bottom: 1px solid var(--color-line);
        border-top: 1px solid var(--color-line);
        display: none;
        flex-direction: column;
        gap: 18px;
        left: 0;
        padding: 20px;
        position: absolute;
        right: 0;
        top: 70px;
      }

      .links.open {
        display: flex;
      }
    }
  `
})
export class NavbarComponent {
  readonly store = STORE_CONFIG;
  readonly isOpen = signal(false);
  readonly faBars = faBars;
  readonly faXmark = faXmark;

  toggleMenu(): void {
    this.isOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.isOpen.set(false);
  }
}
