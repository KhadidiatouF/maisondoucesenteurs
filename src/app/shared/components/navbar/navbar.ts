import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideMenu, LucideX } from '@lucide/angular';
import { STORE_CONFIG } from '../../../core/config/store.config';
import { CartBadgeComponent } from '../cart-badge/cart-badge';
import { WhatsAppButtonComponent } from '../whatsapp-button/whatsapp-button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CartBadgeComponent, WhatsAppButtonComponent, LucideMenu, LucideX],
  template: `
    <header class="site-header">
      <nav class="container nav" aria-label="Navigation principale">
        <a routerLink="/" class="brand" (click)="closeMenu()">
          <span class="brand-mark">MDS</span>
          <span>{{ store.name }}</span>
        </a>

        <button class="icon-btn menu-btn" type="button" (click)="toggleMenu()" [attr.aria-expanded]="isOpen()" aria-label="Ouvrir le menu">
          @if (isOpen()) {
            <svg lucideX size="22" aria-hidden="true"></svg>
          } @else {
            <svg lucideMenu size="22" aria-hidden="true"></svg>
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
      background: rgba(255, 253, 249, 0.92);
      border-bottom: 1px solid var(--color-line);
      position: sticky;
      top: 0;
      z-index: 20;
    }

    .nav {
      align-items: center;
      display: flex;
      min-height: 76px;
      justify-content: space-between;
      gap: 24px;
    }

    .brand {
      align-items: center;
      display: inline-flex;
      font-weight: 900;
      gap: 10px;
      letter-spacing: 0;
      text-decoration: none;
      white-space: nowrap;
    }

    .brand-mark {
      align-items: center;
      background: #211b18;
      border-radius: 8px;
      color: white;
      display: inline-flex;
      font-size: 0.76rem;
      height: 38px;
      justify-content: center;
      width: 44px;
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
      color: var(--color-ink);
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
      .menu-btn {
        display: inline-flex;
      }

      .links {
        align-items: stretch;
        background: white;
        border-bottom: 1px solid var(--color-line);
        border-top: 1px solid var(--color-line);
        display: none;
        flex-direction: column;
        gap: 18px;
        left: 0;
        padding: 20px;
        position: absolute;
        right: 0;
        top: 76px;
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

  toggleMenu(): void {
    this.isOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.isOpen.set(false);
  }
}
