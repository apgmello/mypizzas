import { ProductService } from './../../services/product.service';
import { Product } from 'src/app/models/product';
import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent {
  constructor(
    public activeModal: NgbActiveModal,
    private currencyPipe: CurrencyPipe,
    private productService: ProductService
  ) {}
  formattedAmount = '';
  product: Product = new Product();
  imageError: any = "";
  isImageSaved: boolean = false;

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

    fileChangeEvent(fileInput: any) {
        this.imageError = null;
        if (fileInput.target.files && fileInput.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = (rs: any) => {
                  const imgBase64Path = e.target.result;
                  this.product.imgUrl = imgBase64Path;
                  this.isImageSaved = true;
                };
            };

            reader.readAsDataURL(fileInput.target.files[0]);
        }
    }


}
