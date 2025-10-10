import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCartridge } from './form-cartridge';

describe('FormCartridge', () => {
  let component: FormCartridge;
  let fixture: ComponentFixture<FormCartridge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCartridge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCartridge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
