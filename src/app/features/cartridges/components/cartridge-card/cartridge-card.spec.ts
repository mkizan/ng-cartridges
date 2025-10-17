import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartridgeCard } from './cartridge-card';

describe('Cartridge', () => {
  let component: CartridgeCard;
  let fixture: ComponentFixture<CartridgeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartridgeCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CartridgeCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
