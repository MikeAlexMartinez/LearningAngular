import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartyPlannerComponent } from './party-container/party-container.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: PartyPlannerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
