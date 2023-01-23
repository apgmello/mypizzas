import { Product } from 'src/app/models/product';

export class CartItem {
  product!: Product;
  quantity: number = 1;

  constructor(product: Product) {
    this.product = product;
  }
}
