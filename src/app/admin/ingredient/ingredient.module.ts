import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { IngredientActionComponent } from './ingredient-action/ingredient-action.component';



@NgModule({
  declarations: [
    IngredientListComponent,
    IngredientActionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IngredientModule { }
