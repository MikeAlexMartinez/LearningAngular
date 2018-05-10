import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service';

import { IProduct } from '../product';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;
  id: number;
  errorMessage: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService
  ) { }

  ngOnInit() {
    this.id = +this._route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${this.id}`;
    this._productService.getProducts()
      .subscribe(
        products => {
          this.product = products.filter(p => p.productId === this.id)[0];
        },
        error => this.errorMessage = <any>error
      );
  }

  onBack(): void {
    this._router.navigate(['/products']);
  }

}
