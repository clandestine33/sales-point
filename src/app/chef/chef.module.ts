import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChefRoutingModule } from './chef-routing.module';
import { ChefComponent } from './chef.component';
import { ShopComponent1 } from './shop/shop.component';
import { OrderComponent } from './order/order.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ChefComponent,
    OrderComponent,
    MenuComponent,
    ShopComponent1
  ],
  imports: [
    CommonModule,
    ChefRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ]
})
export class ChefModule { }
