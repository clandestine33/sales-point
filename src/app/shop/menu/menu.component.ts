import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/model/category';
import { Ingredient } from 'src/app/model/ingredient';
import { Menu } from 'src/app/model/menu';
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
  menus: Menu[] = [];
  categories: Category[] = [];
  ingredients: Ingredient[] = [];
  shops: Shop[] = [];
  selectedIngredients: Ingredient[] = [];
  menuForm!: FormGroup;
  menu!: Menu;
  submit: Boolean = false;
  isCreate: boolean = true;
  errorMsg!: any;
  isError: boolean = false;
  image!: File;
  itemPerPage = 10;
  paginationConfig:any = {};
  constructor(
    private menuService: MenuService,
    private _formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private ingredientService: IngredientService,
    private shopService: ShopService
  ) { }

  ngOnInit(): void {
    this.getMenusByUser();
    this.getCategories();
    this.getIngredients();
    this.getShopsByUser();
    this.createForm();
    this.paginationConfig = {
      itemsPerPage: this.itemPerPage,
      currentPage: 1,
      totalItem: this.menus ? this.menus.length : 0
    }
  }

  pageChanged(event: any){
    this.paginationConfig.currentPage = event;
  }

  get f() {
    return this.menuForm.controls;
  }

  addMenu() {
    this.isCreate = true;
    this.menuForm.reset();
    const element = document.getElementById('edit');
    if (element) {
      element.style.display = 'block';
    }
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.image = file
    }
  }

  createForm() {
    this.menuForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      shop: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  onPick(ingredient: Ingredient) {
    if(this.selectedIngredients.includes(ingredient)){
      return
    }
    this.selectedIngredients.push(ingredient)
  }

  remove(i: any) {
    this.selectedIngredients.splice(i, 1)
  }

  getMenusByUser() {
    this.menuService.getMenusByUser().subscribe(
      (data) => {
        console.log(data.data);
        this.menus = data.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (data) => {
        console.log(data.data);
        this.categories = data.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getIngredients() {
    this.ingredientService.getIngredients().subscribe(
      (data) => {
        console.log(data.data);
        this.ingredients = data.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getShopsByUser() {
    this.shopService.getShopsByUser().subscribe(
      (data) => {
        this.shops = data.data;
        console.log(this.shops);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteMenu(id: any) {
    this.menuService.deleteMenu(id).subscribe(
      (data) => {
        console.log(data.msg);
        this.getMenusByUser();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getMenu(id: any) {
    this.isCreate = false;
    const element = document.getElementById('edit');
    if (element) {
      element.style.display = 'block';
    }
    this.menuService.getMenuById(id).subscribe(
      (data) => {
        this.menu = data.data;
        this.menuForm.patchValue(this.menu);
        this.selectedIngredients = this.menu.ingredients
        console.log(this.menu);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    this.submit = true;
    if (this.menuForm.invalid || this.selectedIngredients.length === 0) {
      this.isError = true;
      this.errorMsg = 'Please select an ingredient or field the form properly';
      return;
    }

    const formDate =  new FormData();
    formDate.append('image', this.image)

    let menu: Menu = this.menuForm.value
    menu.ingredients = this.selectedIngredients.map(item => item._id)
    this.menuService.createMenu(this.menuForm.value).subscribe(
      (data) => {
        console.log(data.data);
        this.menuForm.reset();
        Object.keys(this.menuForm.controls).forEach((key) => {
          this.menuForm.get(key)?.setErrors(null);
        });
        this.uploadFile(data.data._id, formDate);
        this.getMenusByUser();
        const element = document.getElementById('edit');
        if (element) {
          element.style.display = 'none';
        }
        this.selectedIngredients = []
      },
      (error) => {
        this.isError = true;
        this.errorMsg = error
        console.log(error);
      }
    );
  }

  uploadFile(id: any, menuObject: any){
    this.menuService.uploadFile(id, menuObject).subscribe((data) => {
      console.log(data);
    }, error => {
      console.log(error)
    })
  }

  onEdit() {
    this.submit = true;
    if (this.menuForm.invalid) {
      return;
    }
    let menu: Menu = this.menuForm.value
    menu.ingredients = this.selectedIngredients.map(item => item._id)

    this.menuService.updateMenu(this.menu._id, this.menu).subscribe(
      (data) => {
        console.log(data.msg);
        this.menuForm.reset();
        Object.keys(this.menuForm.controls).forEach((key) => {
          this.menuForm.get(key)?.setErrors(null);
        });
        this.getMenusByUser();
        const element = document.getElementById('edit');
        if (element) {
          element.style.display = 'none';
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
