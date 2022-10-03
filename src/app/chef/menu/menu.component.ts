import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Category } from 'src/app/model/category';
import { Ingredient } from 'src/app/model/ingredient';
import { Assest, Menu } from 'src/app/model/menu';
import { Shop } from 'src/app/model/shop';
import { CategoryService } from 'src/app/services/category/category.service';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ShopService } from 'src/app/services/shop/shop.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  // deleteMenu(id: any) {
  //   this.menuService.deleteMenu(id).subscribe(
  //     (data) => {
  //       console.log(data.msg);
  //       this.getMenusByUser();
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

}
