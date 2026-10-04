import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { STORE_CONFIG } from '../../../core/config/store.config';
import { CartBadgeComponent } from '../cart-badge/cart-badge';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CartBadgeComponent, FaIconComponent],
  template: `
    <header class="site-header">
      <div class="top-strip">
        <div class="strip-inner" aria-label="Informations Maison Douce Senteur">
          <span>Livraison disponible a Dakar</span>
          <i>|</i>
          <span>Commande simple sur WhatsApp</span>
          <i>|</i>
          <span>Maison Douce Senteur</span>
          <i>|</i>
          <span>Livraison disponible a Dakar</span>
          <i>|</i>
          <span>Commande simple sur WhatsApp</span>
          <i>|</i>
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
          <button class="drawer-close" type="button" (click)="closeMenu()" aria-label="Fermer le menu">
            <fa-icon [icon]="faXmark" aria-hidden="true" />
          </button>
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="closeMenu()">Accueil</a>
          <a routerLink="/products" routerLinkActive="active" (click)="closeMenu()">Parfums</a>
          <a routerLink="/" fragment="about" (click)="closeMenu()">A propos</a>
          <a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">Contact</a>
          <app-cart-badge />
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
      overflow: hidden;
    }

    .strip-inner {
      animation: strip-marquee 22s linear infinite;
      align-items: center;
      display: flex;
      gap: 22px;
      min-height: 30px;
      min-width: max-content;
      padding-inline: 22px;
      width: max-content;
    }

    .strip-inner span {
      white-space: nowrap;
    }

    .strip-inner i {
      color: rgba(255, 255, 255, 0.32);
      font-style: normal;
    }

    @keyframes strip-marquee {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
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
      min-width: 0;
    }

    .links a {
      color: var(--color-ink);
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

    .drawer-close {
      display: none;
    }

    @media (max-width: 820px) {
      .site-header {
        background: rgba(255, 253, 246, 0.94);
      }

      .top-strip {
        font-size: 0.68rem;
      }

      .strip-inner {
        animation-duration: 18s;
        min-height: 28px;
      }

      .nav {
        position: relative;
        min-height: 70px;
      }

      .brand {
        gap: 9px;
      }

      .brand > span:last-child {
        display: inline;
        font-size: clamp(1rem, 3.8vw, 1.24rem);
        left: 50%;
        position: absolute;
        text-align: center;
        transform: translateX(-50%);
        white-space: nowrap;
        width: auto;
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
        border-left: 1px solid var(--color-line);
        bottom: 0;
        box-shadow: -22px 0 50px rgba(6, 5, 4, 0.18);
        display: flex;
        flex-direction: column;
        gap: 4px;
        height: 100vh;
        min-width: 250px;
        overflow-y: auto;
        padding: 78px 20px 28px;
        position: fixed;
        right: 0;
        top: 0;
        transform: translateX(100%);
        transition: transform 220ms ease;
        width: min(52vw, 340px);
        z-index: 60;
      }

      .drawer-close {
        align-items: center;
        background: var(--color-primary);
        border: 0;
        border-radius: 999px;
        color: white;
        display: inline-flex;
        height: 40px;
        justify-content: center;
        position: absolute;
        right: 18px;
        top: 18px;
        width: 40px;
      }

      .links a {
        border-bottom: 1px solid var(--color-line);
        color: var(--color-ink);
        min-height: 52px;
        padding: 17px 4px;
      }

      .links a,
      .links app-cart-badge {
        max-width: 100%;
      }

      .links.open {
        transform: translateX(0);
      }
    }

    @media (max-width: 390px) {
      .nav {
        gap: 12px;
      }

      .brand > span:last-child {
        font-size: 0.96rem;
        white-space: nowrap;
        width: auto;
      }

      .brand-mark {
        flex: 0 0 42px;
        height: 42px;
        width: 42px;
      }

      .icon-btn {
        flex: 0 0 42px;
        height: 42px;
        width: 42px;
      }

      .links {
        min-width: 220px;
        width: 58vw;
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
