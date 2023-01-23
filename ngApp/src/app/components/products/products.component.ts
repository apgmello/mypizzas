import { NewProductComponent } from './../new-product/new-product.component';
import { Subscription } from 'rxjs';
import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
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

  ngOnInit(): void {
    this.authService.publishIsAdmin();
  }

  async getProducts() {
    this.products = await this.productService.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  newProduct(){
    const modalRef = this.modalService.open(NewProductComponent, {backdrop: false});
    modalRef.componentInstance.name = 'Bolinho';
  }


  deleteProduct(product: Product) {

  }
}

