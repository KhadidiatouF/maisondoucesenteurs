import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="empty surface">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      @if (link) {
        <a class="btn btn-primary" [routerLink]="link">{{ linkLabel }}</a>
      }
    </section>
  `,
  styles: `
    .empty {
      margin: 44px auto;
      max-width: 620px;
      padding: 48px 28px;
      text-align: center;
    }

    h1 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 500;
      margin: 10px 0;
    }

    p {
      color: var(--color-muted);
      line-height: 1.7;
      margin-bottom: 24px;
    }
  `
})
export class EmptyStateComponent {
  @Input() eyebrow = 'Information';
  @Input() title = 'Aucun resultat';
  @Input() description = '';
  @Input() link?: string;
  @Input() linkLabel = 'Continuer';
}
