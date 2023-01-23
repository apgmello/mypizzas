import { CartService } from './../../services/cart.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  
  constructor(private cartService: CartService, private router: Router){}

  checkout(){
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }
}
