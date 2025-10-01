import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartridgeList } from './cartridge-list';

describe('CartridgesList', () => {
  let component: CartridgeList;
  let fixture: ComponentFixture<CartridgeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartridgeList],
    }).compileComponents();

    fixture = TestBed.createComponent(CartridgeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
