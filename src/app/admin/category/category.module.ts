import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryActionComponent } from './category-action/category-action.component';



@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryActionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CategoryModule { }
