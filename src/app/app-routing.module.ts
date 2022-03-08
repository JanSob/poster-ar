import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductGridComponent} from "./components/product-grid/product-grid.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";

const routes: Routes = [
  { path: '', redirectTo: 'products' , pathMatch: 'full'},
  { path: 'products/details/:id', component: ProductDetailsComponent , pathMatch: 'full'},
  { path: 'products', component: ProductGridComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
