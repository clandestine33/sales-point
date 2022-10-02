import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopActionComponent } from './shop-action.component';

describe('ShopActionComponent', () => {
  let component: ShopActionComponent;
  let fixture: ComponentFixture<ShopActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
