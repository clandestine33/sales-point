import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuActionComponent } from './menu-action/menu-action.component';
import { MenuListComponent } from './menu-list/menu-list.component';



@NgModule({
  declarations: [
    MenuActionComponent,
    MenuListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MenuModule { }
