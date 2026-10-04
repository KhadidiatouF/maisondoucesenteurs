import { Injectable } from '@angular/core';
import { STORE_CONFIG } from '../config/store.config';
import { CartItem } from '../models/cart-item.model';
import { Customer } from '../models/customer.model';

@Injectable({ providedIn: 'root' })
export class WhatsAppService {
  buildMessage(items: CartItem[], customer: Customer, subtotal: number, deliveryFee: number, total: number): string {
    const orderLines = items
      .map((item) => {
        const lineTotal = this.formatPrice(item.product.price * item.quantity);
        return `- ${item.product.name} x ${item.quantity}\n  ${lineTotal}`;
      })
      .join('\n\n');

    const note = customer.note?.trim() ? `\n\nNote :\n${customer.note.trim()}` : '';

    return `Bonjour, je souhaite passer une commande.\n\nCOMMANDE\n\n${orderLines}\n\nSous-total : ${this.formatPrice(subtotal)}\nLivraison : ${this.formatPrice(deliveryFee)}\n\nTOTAL : ${this.formatPrice(total)}\n\nClient :\nNom : ${customer.fullName}\nTelephone : ${customer.phone}\nAdresse : ${customer.address}\nVille / quartier : ${customer.city}${note}\n\nMerci.`;
  }

  buildOrderUrl(items: CartItem[], customer: Customer, subtotal: number, deliveryFee: number, total: number): string {
    const message = this.buildMessage(items, customer, subtotal, deliveryFee, total);
    return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  buildContactUrl(message = 'Bonjour, je souhaite avoir des informations sur vos parfums.'): string {
    return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  private formatPrice(value: number): string {
    return `${new Intl.NumberFormat('fr-FR').format(value)} ${STORE_CONFIG.currency}`;
  }
}
