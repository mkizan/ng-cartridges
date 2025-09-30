import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cartridge } from './cartridge';

describe('Cartridge', () => {
  let component: Cartridge;
  let fixture: ComponentFixture<Cartridge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cartridge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cartridge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
