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
      min-height: 42px;
      padding-inline: 16px;
    }

    :host(.floating-whatsapp) .whatsapp {
      box-shadow: 0 18px 38px rgba(6, 5, 4, 0.28);
      min-height: 54px;
      padding-inline: 22px;
    }

    @media (max-width: 760px) {
      :host(.floating-whatsapp) {
        bottom: 16px;
        right: 16px;
      }

      :host(.floating-whatsapp) .whatsapp {
        border-radius: 999px;
        min-height: 52px;
        padding-inline: 18px;
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
