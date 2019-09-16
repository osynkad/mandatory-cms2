import { BehaviorSubject } from 'rxjs';

export const cart$ = new BehaviorSubject(window.localStorage.getItem('cart'));

export function updateCart(updatedCart) {
  updatedCart ? window.localStorage.setItem('cart', JSON.stringify(updatedCart)) : window.localStorage.removeItem('cart')
  cart$.next(JSON.stringify(updatedCart));
}