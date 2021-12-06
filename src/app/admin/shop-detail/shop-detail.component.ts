import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shop } from 'src/app/model/shop';
import { ShopService } from 'src/app/services/shop/shop.service';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss']
})
export class ShopDetailComponent implements OnInit {

  shop!: Shop;
  logo!: any;
  shopId: any
  constructor(
    private actRouter: ActivatedRoute,
    private shopService: ShopService,
  ) { }

  ngOnInit(): void {
    this.shopId = this.actRouter.snapshot.params['shopId'];
    console.log(this.shopId);
    this.getShopById(this.shopId)
  }

  getShopById(shopId: any){
    this.shopService.getShopById(shopId).subscribe((data) => {
      this.shop = data.data;
      console.log(this.shop);
      this.shop.certificates.map((data) => {
        if(data.type === 'logo'){
          this.logo = data
        }
      })
    }, error => {
      console.log(error);
    })
  }

  onApprove(id: any) {
    let body = {
      approvalStatus: true
    }

    this.shopService.approveShop(id, body).subscribe((data: any) => {
      console.log(data.msg)
    },(error: any) => {
      console.log(error)
    })
  }

  deleteShop(){
    this.shopService.deleteShop(this.shopId).subscribe((data:any) => {
      console.log(data.msg)
    }, (error: any) => {
      console.log(error);
    })
  }
}
