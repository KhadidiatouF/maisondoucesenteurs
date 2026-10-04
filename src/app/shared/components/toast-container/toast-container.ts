import { Component } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  template: `
    <div class="toasts" aria-live="polite" aria-atomic="true">
      @for (toast of toastService.toasts(); track toast.id) {
        <button type="button" (click)="toastService.dismiss(toast.id)">{{ toast.message }}</button>
      }
    </div>
  `,
  styles: `
    .toasts {
      bottom: 20px;
      display: grid;
      gap: 10px;
      position: fixed;
      right: 20px;
      z-index: 50;
    }

    button {
      background: #211b18;
      border: 0;
      border-radius: 8px;
      box-shadow: 0 16px 36px rgba(33, 27, 24, 0.18);
      color: white;
      cursor: pointer;
      font-weight: 800;
      min-height: 46px;
      padding: 0 18px;
      text-align: left;
    }

    @media (max-width: 620px) {
      .toasts {
        left: 16px;
        right: 16px;
      }
    }
  `
})
export class ToastContainerComponent {
  constructor(readonly toastService: ToastService) {}
}
