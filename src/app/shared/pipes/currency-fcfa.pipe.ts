import { Pipe, PipeTransform } from '@angular/core';
import { STORE_CONFIG } from '../../core/config/store.config';

@Pipe({
  name: 'currencyFcfa',
  standalone: true
})
export class CurrencyFcfaPipe implements PipeTransform {
  transform(value: number): string {
    return `${new Intl.NumberFormat('fr-FR').format(value)} ${STORE_CONFIG.currency}`;
  }
}
