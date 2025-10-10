import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCartridge } from './add-cartridge';

describe('AddCartridge', () => {
  let component: AddCartridge;
  let fixture: ComponentFixture<AddCartridge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCartridge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCartridge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
