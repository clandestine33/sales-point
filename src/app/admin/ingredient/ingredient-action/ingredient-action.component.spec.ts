import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientActionComponent } from './ingredient-action.component';

describe('IngredientActionComponent', () => {
  let component: IngredientActionComponent;
  let fixture: ComponentFixture<IngredientActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
