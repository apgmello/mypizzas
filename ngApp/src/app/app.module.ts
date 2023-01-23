import { UserService } from './services/user.service';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard';
import { ProductsComponent } from './components/products/products.component';
import { ProductService } from './services/product.service';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from './services/cart.service';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserListComponent } from './components/user-list/user-list.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserRegisterComponent,
    ProductsComponent,
    CartComponent,
    CheckoutComponent,
    UserListComponent,
    NewProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [
    AuthService, 
    AuthGuard, 
    UserService, 
    ProductService, 
    CartService, 
    CurrencyPipe,
    {provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
