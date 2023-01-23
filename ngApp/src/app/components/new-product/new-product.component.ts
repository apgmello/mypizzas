import { ProductService } from './../../services/product.service';
import { Product } from 'src/app/models/product';
import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent {
  @Input() name = '';

  constructor(
    public activeModal: NgbActiveModal,
    private currencyPipe: CurrencyPipe,
    private productService: ProductService
  ) {}
  formattedAmount = '';
  product: Product = new Product();

  transformAmount(element: any) {
    if (element.target.value) {
      this.formattedAmount =
        '' + this.currencyPipe.transform(this.formattedAmount, 'R$');
      element.target.value = this.formattedAmount;
    }
  }

  async saveProduct() {
    this.product = await this.productService.save(this.product);
    this.activeModal.close('Close click');
  }
}
