import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Maison Douce Senteur | Parfumerie elegante',
    loadComponent: () => import('./pages/home/home').then((m) => m.HomePage)
  },
  {
    path: 'products',
    title: 'Parfums | Maison Douce Senteur',
    loadComponent: () => import('./pages/products/products').then((m) => m.ProductsPage)
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./pages/product-details/product-details').then((m) => m.ProductDetailsPage)
  },
  {
    path: 'cart',
    title: 'Panier | Maison Douce Senteur',
    loadComponent: () => import('./pages/cart/cart').then((m) => m.CartPage)
  },
  {
    path: 'checkout',
    title: 'Commande WhatsApp | Maison Douce Senteur',
    loadComponent: () => import('./pages/checkout/checkout').then((m) => m.CheckoutPage)
  },
  {
    path: 'contact',
    title: 'Contact | Maison Douce Senteur',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.ContactPage)
  },
  {
    path: '**',
    title: 'Page introuvable | Maison Douce Senteur',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundPage)
  }
];
