import { BehaviorSubject, catchError, combineLatest, EMPTY, map, Subject } from 'rxjs';
import { Component, } from '@angular/core';

import { ProductCategory } from '../product-categories/product-category';

import { Product } from './product';
import { ProductService } from './product.service';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  categories: ProductCategory[] = [];

  //crete Action Stream:
  private categorySelectedSubject = new BehaviorSubject<number>(0)
  categorySelectedAction$ = this.categorySelectedSubject.asObservable()



  //combine action and data streams:
  products$ = combineLatest([
    this.productService.productsWithCategories$,
    this.categorySelectedAction$
  ]).pipe(
    map(([products, selectedCategoryId]) =>
      products.filter((product) =>
        selectedCategoryId ? product.categoryId === selectedCategoryId : true)),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY
    })
  )


  categories$ = this.categoryService.categories$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY
    })
  )



  constructor(private productService: ProductService, private categoryService: ProductCategoryService) { }



  onAdd(): void {
    console.log('Not yet implemented');
  }

  // Emit value to Action stream when Action is occurred:
  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(Number(categoryId))
  }
}
