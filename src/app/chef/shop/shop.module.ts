import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopActionComponent } from './shop-action/shop-action.component';



@NgModule({
  declarations: [
    ShopListComponent,
    ShopActionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ShopModule { }
