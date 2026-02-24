import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartridgeFilter } from './cartridge-filter';

describe('CartridgeFilter', () => {
  let component: CartridgeFilter;
  let fixture: ComponentFixture<CartridgeFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartridgeFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartridgeFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
