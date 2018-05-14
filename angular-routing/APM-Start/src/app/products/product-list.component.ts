import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './app/products/product-list.component.html',
    styleUrls: ['./app/products/product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string;
    errorMessage: string;

    products: IProduct[];

    constructor(
        private route: ActivatedRoute
    ) { }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.products = this.route.snapshot.data['products'];
        let lF = this.route.snapshot.queryParamMap.get('filterBy') || undefined;
        this.listFilter = lF === 'undefined' ? undefined : lF;
        this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';
    }
}
