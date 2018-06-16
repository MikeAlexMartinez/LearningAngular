import { NgModule } from '@angular/core';
import { RouterModule, /*PreloadAllModules*/ } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

import { AuthGuard } from './user/auth-guard.service';
import { SelectiveStrategy } from './selective-strategy.service';

const routes = [
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'products',
    loadChildren: 'app/products/product.module#ProductModule',
    data: { preload: false },
    canActivate: [ AuthGuard ]
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      preloadingStrategy: SelectiveStrategy
    })
  ],
  providers: [ AuthGuard, SelectiveStrategy ],
  exports: [ RouterModule ],
  declarations: [
    WelcomeComponent,
    PageNotFoundComponent
  ]
})
export class AppRoutingModule {}
