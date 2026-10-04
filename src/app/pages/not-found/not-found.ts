import { Component } from '@angular/core';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [EmptyStateComponent],
  template: `
    <div class="container">
      <app-empty-state eyebrow="404" title="Page introuvable" description="La page demandee n existe pas ou a ete deplacee." link="/" linkLabel="Retour a l accueil" />
    </div>
  `
})
export class NotFoundPage {}
