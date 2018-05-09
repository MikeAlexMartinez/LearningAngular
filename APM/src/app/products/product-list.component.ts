import { Component, OnInit } from '@angular/core';

import { ProductService } from './product.service';
import { IProduct } from './product';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: any;

  _listFilter: string;
  get listFilter() {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: IProduct[];
  products: IProduct[];

  constructor(private _productService: ProductService) { }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => 
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    console.log('In OnInit');
    this._productService.getProducts()
      .subscribe(
        products => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error => this.errorMessage = <any>error
      );
  }

  onRatingClicked(message: string): void { 
    this.pageTitle = 'Product List: ' + message;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  };

}