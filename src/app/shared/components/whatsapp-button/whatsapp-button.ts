import { Component, Input, inject } from '@angular/core';
import { LucideMessageCircle } from '@lucide/angular';
import { WhatsAppService } from '../../../core/services/whatsapp.service';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [LucideMessageCircle],
  template: `
    <a class="btn btn-gold whatsapp" [href]="url" target="_blank" rel="noopener">
      <svg lucideMessageCircle size="18" aria-hidden="true"></svg>
      <span>{{ label }}</span>
    </a>
  `,
  styles: `
    .whatsapp {
      min-height: 42px;
      padding-inline: 16px;
    }
  `
})
export class WhatsAppButtonComponent {
  private readonly whatsapp = inject(WhatsAppService);

  @Input() label = 'WhatsApp';
  readonly url = this.whatsapp.buildContactUrl();
}
