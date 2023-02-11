import { catchError, EMPTY } from 'rxjs';
import { Component } from '@angular/core';


import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html'
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  errorMessage = '';

  products$ = this.productService.productsWithCategories$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY
    })
  )

  selectedProduct$ = this.productService.selectedProduct$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY
    })
  )
  constructor(private productService: ProductService) { }


  onSelected(productId: number): void {
    this.productService.onSelectedProductChanges(productId)
  }
}
