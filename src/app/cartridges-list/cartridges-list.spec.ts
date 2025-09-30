import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartridgesList } from './cartridges-list';

describe('CartridgesList', () => {
  let component: CartridgesList;
  let fixture: ComponentFixture<CartridgesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartridgesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartridgesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
