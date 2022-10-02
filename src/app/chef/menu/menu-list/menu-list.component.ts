import { Component, OnInit } from '@angular/core';
import {Menu} from "../../../model/menu";
import {MenuService} from "../../../services/menu/menu.service";

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  menus: Menu[] = [];
  paginationConfig:any = {};
  itemPerPage = 10;

  constructor(
    private menuService: MenuService,
  ) { }

  ngOnInit(): void {
    this.getMenusByUser();
    this.paginationConfig = {
      itemsPerPage: this.itemPerPage,
      currentPage: 1,
      totalItem: this.menus ? this.menus.length : 0
    }
  }

  getMenu(id: any) {

  }

  addMenu() {

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

  pageChanged(event: any){
    this.paginationConfig.currentPage = event;
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

}
