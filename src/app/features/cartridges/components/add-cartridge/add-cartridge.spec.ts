import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCartridgeButton } from './add-cartridge-button';

describe('AddCartridgeButton', () => {
  let component: AddCartridgeButton;
  let fixture: ComponentFixture<AddCartridgeButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCartridgeButton],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCartridgeButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
