import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../messages/message.service';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { Z_SYNC_FLUSH } from 'zlib';

@Component({
    templateUrl: './app/products/product-edit.component.html',
    styleUrls: ['./app/products/product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
    pageTitle: string = 'Product Edit';
    errorMessage: string;

    private dataIsValid: { [key: string]: boolean } = {};
    private currentProduct: IProduct;
    private originalProduct: IProduct;

    get product(): IProduct {
        return this.currentProduct;
    }
    set product(value: IProduct) {
        this.currentProduct = value;
        // clone product to retain copy
        this.originalProduct = Object.assign({}, value);
    }

    constructor(private productService: ProductService,
                private messageService: MessageService,
                private route: ActivatedRoute,
                private router: Router
    ) { }
    
    ngOnInit() {
        this.route.data.subscribe(data => {
            this.onProductRetrieved(data['product']);
        });
    }

    onProductRetrieved(product: IProduct): void {
        this.product = product;

        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        } else {
            this.pageTitle = `Edit Product: ${this.product.productName}`;
        }
    }

    get isDirty(): boolean {
        return JSON.stringify(this.originalProduct) !== JSON.stringify(this.currentProduct);
    }

    deleteProduct(): void {
        if (this.product.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
       } else {
            if (confirm(`Really delete the product: ${this.product.productName}?`)) {
                this.productService.deleteProduct(this.product.id)
                    .subscribe(
                        () => this.onSaveComplete(`${this.product.productName} was deleted`),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    isValid(tab: string): boolean {
        this.validate();

        if (tab) return this.dataIsValid[tab];

        return Object.keys(this.dataIsValid).every(
            (key) => this.dataIsValid[key]
        ); 
    }

    saveProduct(): void {
        let shouldAllowSave: boolean = true;

        if (this.isValid(null)) {
            this.productService.saveProduct(this.product)
                .subscribe(
                    () => this.onSaveComplete(`${this.product.productName} was saved`),
                    (error: any) => this.errorMessage = <any>error
                );
        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }

    reset(): void {
        this.dataIsValid = null;
        this.originalProduct = Object.assign({}, this.currentProduct);
    }

    onSaveComplete(message?: string): void {
        if (message) {
            this.messageService.addMessage(message);
        }
        this.reset();

        // Navigate back to the product list
        this.router.navigate(['/products'], { queryParamsHandling: "preserve" });
    }

    validate(): void {
        // clear the validation object
        this.dataIsValid = {};

        // info tab
        if (this.product.productName &&
            this.product.productName.length >= 3 &&
            this.product.productCode
        ) {
            this.dataIsValid['info'] = true;
        } else {
            this.dataIsValid['info'] = false;
        }

        // tags tab
        if (this.product.category &&
            this.product.category.length >= 1
        ) {
            this.dataIsValid['tags'] = true;
        } else {
            this.dataIsValid['tags'] = false;
        }
    }
}
