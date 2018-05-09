import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from './../shared/shared.module';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import { ProductGuardService } from './product-guard.service';
import { ProductService } from './product.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
  ],
  providers: [
    ProductService,
    ProductGuardService
  ]
})
export class ProductModule { }
