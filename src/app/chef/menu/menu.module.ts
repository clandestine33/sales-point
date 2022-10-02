import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuActionComponent } from './menu-action/menu-action.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export const routes:Routes = [
  {path:'', component: MenuComponent}
]


@NgModule({
  declarations: [
    MenuActionComponent,
    MenuListComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MenuModule { }
