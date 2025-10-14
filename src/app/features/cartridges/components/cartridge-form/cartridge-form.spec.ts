import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartridgeForm } from './cartridge-form';

describe('CartridgeForm', () => {
  let component: CartridgeForm;
  let fixture: ComponentFixture<CartridgeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartridgeForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CartridgeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
