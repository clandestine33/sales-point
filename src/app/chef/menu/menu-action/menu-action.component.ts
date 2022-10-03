import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Assest, Menu} from "../../../model/menu";
import {Category} from "../../../model/category";
import {Ingredient} from "../../../model/ingredient";
import {Shop} from "../../../model/shop";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MenuService} from "../../../services/menu/menu.service";
import {CategoryService} from "../../../services/category/category.service";
import {IngredientService} from "../../../services/ingredient/ingredient.service";
import {ShopService} from "../../../services/shop/shop.service";

@Component({
  selector: 'app-menu-action',
  templateUrl: './menu-action.component.html',
  styleUrls: ['./menu-action.component.scss']
})
export class MenuActionComponent implements OnInit {
  menus: Menu[] = [];
  createMenu:Menu = new Menu();
  categories: Category[] = [];
  ingredientList: Ingredient[] = [];
  shops: Shop[] = [];
  selectedIngredients: Ingredient[] = [];
  menuForm!: FormGroup;
  menu!: Menu;
  submit: Boolean = false;
  isCreate: boolean = true;
  base64File: any;
  fileObject:any;
  fileName!: string;
  fileSize: any;
  errorMsg!: string;
  allowedMimeType: any[] = ['image/png', 'image/jpeg'];
  @ViewChild("fileuploader", /* TODO: add static flag */ { read: ElementRef }) fileUploader!: ElementRef;
  isImage: boolean = false;
  image!: Assest
  isError: boolean = false;
  isContinue: boolean = false;
  constructor(private menuService: MenuService,
              private _formBuilder: FormBuilder,
              private categoryService: CategoryService,
              private ingredientService: IngredientService,
              private shopService: ShopService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getIngredients();
    this.getShopsByUser();
    this.createForm();
  }

  get f() {
    return this.menuForm.controls;
  }

  createForm() {
    this.menuForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      shop: ['', Validators.required],
      price: ['', Validators.required],
      ingredients: this._formBuilder.array([])
    });
  }


  selectImage(event: any) {
    if (event.target.files.length > 0) {
      this.setDocument(event.target.files[0]);

    }
  }

  createIngredient(ingredient: Ingredient):FormGroup {
    return this._formBuilder.group({
      name: ingredient.ingredient,
      ingredient: ingredient._id,
      calorie: ['', Validators.required],
    });
  }

  get ingredients():FormArray {
    return this.menuForm.get('ingredients') as FormArray;
  }

  addIngredient(ingredient:Ingredient):void{
    this.ingredients.push(this.createIngredient(ingredient))
  }

  removeIngredient(i: number){
    this.ingredients.removeAt(i);
  }

  onPick(ingredient: Ingredient) {
    if(this.selectedIngredients.includes(ingredient)){
      return
    }
    this.selectedIngredients.push(ingredient);
    this.addIngredient(ingredient)
  }

  remove(i: any) {
    this.selectedIngredients.splice(i, 1)
    this.removeIngredient(i);
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
        this.ingredientList = data.data;
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

  setDocument(file: any): void {
    if (this.allowedMimeType.indexOf(file.type) != -1) {
      let size = (file.size / 1024) / 1024
      if (size > 5) {
        this.errorMsg = 'Maximum size is 5MB';
        this.resetFileInput()
        return;
      }
      this.fileName = file.name.length > 10 ? file.name.substring(0, 10) + '...' : file.name
      this.fileSize = ((file.size / 1024) / 1024).toFixed(2) + 'MB'
      const toBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      };

      toBase64(file)
        .then(data => {
          this.base64File = data
          this.fileObject = {
            id: 1, fileType: this.getFileType(file.type),
            URL: this.base64File,
            name: this.fileName,
            fieldName: file.name,
            size: this.fileSize,
            type: this.getFileType(file.type)
          }
          this.image = this.fileObject;
          this.isImage = true;
        })

    } else {
      this.resetFileInput();
      this.errorMsg = 'File format not supported ';
    }
  }

  resetFileInput() {
    this.fileUploader.nativeElement.reset();
  }

  getFileType(type:string):any{
    if (type.includes('png')) {
      return 'png'
    } else if (type.includes('jpg') || type.includes('jpeg')) {
      return 'jpg'
    }
  }

  onSubmit() {
    this.submit = true;
    if (this.menuForm.invalid || !this.isImage) {
      this.isError = true;
      this.errorMsg = 'Please select an ingredient or field the form properly';
      return;
    }
    this.createMenu = this.menuForm.value;
    this.createMenu.image = this.fileObject;
    console.log(this.createMenu);

    this.menuService.createMenu(this.createMenu).subscribe(
      (data) => {
        console.log(data.data);
        this.menuForm.reset();
        Object.keys(this.menuForm.controls).forEach((key) => {
          this.menuForm.get(key)?.setErrors(null);
        });
        // this.getMenusByUser();
        const element = document.getElementById('edit');
        if (element) {
          element.style.display = 'none';
        }
        this.selectedIngredients = []
        this.isContinue  = !this.isContinue;
        this.ingredients.clear()
      },
      (error) => {
        this.isError = true;
        this.errorMsg = error
        console.log(error);
      }
    );
  }

  onNext() {
    if(this.isContinue === true && this.selectedIngredients.length < 1){
      this.isError = true;
      this.errorMsg = 'Please select an ingredient or field the form properly';
      return;
    }
    this.isContinue  = !this.isContinue;
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
        // this.getMenusByUser();
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
