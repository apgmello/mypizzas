import { CartService } from './services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Pizzas';
  loggedIn = false;
  subscriptionLoggedIn: Subscription;
  itemsInCart = 0;
  subscriptionItemsInCart: Subscription;
  isAdminSubscription: Subscription;
  isAdmin = false;
  
  constructor(private authService: AuthService, private cartService: CartService, private router: Router) {
    this.loggedIn = localStorage.getItem('token') != null;
    this.subscriptionLoggedIn = this.authService.loggedInObservable.subscribe({
      next: (loggedIn) => {
        this.loggedIn = loggedIn;
      }
    })
    this.subscriptionItemsInCart = this.cartService.itemsInCartObservable.subscribe({
      next: (itemsInCart) => {
        this.itemsInCart = itemsInCart;
      }
    })
    this.isAdminSubscription = this.authService.isAdminObservable.subscribe({
      next: (isAdmin) => {
        console.log(isAdmin)
        this.isAdmin = isAdmin;
      }
    })
    this.cartService.publishItemsInCart()
    this.authService.publishIsAdmin()
  }

  ngOnInit(): void {
    if(this.authService.loggedIn() && !this.isAdmin)
      this.router.navigate(['/products']);
  }
  
  login(){
    this.router.navigate(['/login']);
  }
  
  logout() {
    this.authService.logoutUser();
  }

  navigate(destiny: string) {
    if(destiny == '' && !this.isAdmin){
      destiny = "/products"
    }
    this.router.navigate([`/${destiny}`]);
  }

}
