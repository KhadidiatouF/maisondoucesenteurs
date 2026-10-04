import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 1;
  private readonly toastsSignal = signal<Toast[]>([]);

  readonly toasts = this.toastsSignal.asReadonly();

  show(message: string): void {
    const toast = { id: this.nextId++, message };
    this.toastsSignal.update((toasts) => [...toasts, toast]);
    window.setTimeout(() => this.dismiss(toast.id), 2600);
  }

  dismiss(id: number): void {
    this.toastsSignal.update((toasts) => toasts.filter((toast) => toast.id !== id));
  }
}
