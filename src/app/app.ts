import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { ToastContainerComponent } from './shared/components/toast-container/toast-container';
import { WhatsAppButtonComponent } from './shared/components/whatsapp-button/whatsapp-button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, WhatsAppButtonComponent, ToastContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
