import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { ProductService } from './product.service';
import { IProduct } from './product';

@Injectable()
export class ProductsResolver implements Resolve<IProduct[]> {

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct[]> {
    return this.productService.getProducts()
      .catch(error => {
        console.log(`Error retrieving products`);
        this.router.navigate(['/']);
        return Observable.of(null);
      })
  }
}