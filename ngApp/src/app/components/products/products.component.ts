import { NewProductComponent } from './../new-product/new-product.component';
import { Subscription } from 'rxjs';
import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products = new Array<Product>();
  isAdminSubscription: Subscription;
  isAdmin = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    this.isAdminSubscription = this.authService.isAdminObservable.subscribe({
      next: (isAdmin) => {
        this.isAdmin = isAdmin;
      },
    });
    this.getProducts();
  }

  async getProducts() {
    this.products = await this.productService.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  newProduct(){
    const modalRef = this.modalService.open(NewProductComponent, {backdrop: false});

    modalRef.closed.subscribe({
      next: (_) => {
        this.getProducts();
      }
    })
  }


  async deleteProduct(product: Product) {
    this.productService.delete(product.id).then(_ => {
      this.getProducts();
    });
  }
}

