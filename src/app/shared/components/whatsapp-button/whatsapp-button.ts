import { Component, Input, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { WhatsAppService } from '../../../core/services/whatsapp.service';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [FaIconComponent],
  template: `
    <a class="btn btn-gold whatsapp" [href]="url" target="_blank" rel="noopener">
      <fa-icon [icon]="faWhatsapp" aria-hidden="true" />
      <span>{{ label }}</span>
    </a>
  `,
  styles: `
    :host(.floating-whatsapp) {
      bottom: 22px;
      position: fixed;
      right: 22px;
      z-index: 45;
    }

    .whatsapp {
      background: #25d366;
      color: white;
      min-height: 42px;
      padding-inline: 16px;
      white-space: nowrap;
    }

    .whatsapp fa-icon {
      color: white;
      font-size: 1.2rem;
    }

    :host(.floating-whatsapp) .whatsapp {
      box-shadow: 0 18px 38px rgba(6, 5, 4, 0.28);
      min-height: 54px;
      border-radius: 999px;
      padding-inline: 22px;
    }

    :host(.floating-whatsapp) .whatsapp:hover {
      background: #1fb457;
    }

    @media (max-width: 760px) {
      :host(.floating-whatsapp) {
        bottom: 16px;
        right: 16px;
      }

      :host(.floating-whatsapp) .whatsapp {
        border-radius: 999px;
        gap: 8px;
        height: 56px;
        justify-content: center;
        min-height: 56px;
        padding: 0;
        width: 56px;
      }

      :host(.floating-whatsapp) .whatsapp span {
        display: none;
      }
    }

    @media (max-width: 390px) {
      :host(.floating-whatsapp) {
        bottom: 14px;
        right: 12px;
      }

      :host(.floating-whatsapp) .whatsapp {
        min-height: 48px;
        padding: 0;
        width: 48px;
      }

      :host(.floating-whatsapp) .whatsapp span {
        font-size: 0.86rem;
      }
    }
  `
})
export class WhatsAppButtonComponent {
  private readonly whatsapp = inject(WhatsAppService);

  @Input() label = 'WhatsApp';
  readonly url = this.whatsapp.buildContactUrl();
  readonly faWhatsapp = faWhatsapp;
}
