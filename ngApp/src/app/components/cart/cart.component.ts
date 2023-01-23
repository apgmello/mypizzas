import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart = new Array<CartItem>();

  constructor(private cartService: CartService, private router: Router) {}
  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  plusQuantity(productId: number) {
    this.cartService.addOne(productId)
  }

  minusQuantity(productId: number) {
    this.cartService.removeOne(productId);
  }

  minusDisabled(quantity: number) {
    return quantity==1;
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId)
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

  getSum() {
    return this.cartService.cartSum();
  }

}
