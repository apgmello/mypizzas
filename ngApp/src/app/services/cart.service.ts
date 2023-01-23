import { CartItem } from './../models/cart-item';
import { Product } from 'src/app/models/product';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  constructor() {
    this.cart = new Array<CartItem>();
    var cartString = localStorage.getItem('cart');
    if (cartString) this.cart = JSON.parse(cartString);
    this.publishItemsInCart();
  }
  ngOnInit(): void {
    this.publishItemsInCart();
  }

  private cart: CartItem[];
  itemsInCartSource = new Subject<number>();
  itemsInCartObservable = this.itemsInCartSource.asObservable();

  addToCart(product: Product) {
    var cartString = localStorage.getItem('cart');
    if (cartString) this.cart = JSON.parse(cartString);
    var item = this.cart.find((c) => c.product.id == product.id);
    if (item) item.quantity++;
    else this.cart.push(new CartItem(product));
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.publishItemsInCart();
  }

  removeFromCart(productId: number) {
    var index = this.cart.findIndex((c) => c.product.id == productId);
    this.cart.splice(index, 1);
    this.publishItemsInCart();
  }

  publishItemsInCart() {
    var total = 0;
    this.cart.forEach(cartItem => {
      total += cartItem.quantity;
    })
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.itemsInCartSource.next(total);
  }

  getCart() {
    return this.cart;
  }

  addOne(productId: number) {
    var item = this.cart.find((c) => c.product.id == productId);
    if (item) item.quantity++;
    this.publishItemsInCart();
  }

  removeOne(productId: number) {
    var item = this.cart.find((c) => c.product.id == productId);
    if (item) item.quantity--;
    this.publishItemsInCart();
  }

  cartSum() {
    var sum = 0;
    this.cart.forEach(c => {
      sum += c.product.price * c.quantity;
    })
    return sum;
  }

  clearCart() {
    this.cart = new Array<CartItem>();
    this.publishItemsInCart();
  }

}
