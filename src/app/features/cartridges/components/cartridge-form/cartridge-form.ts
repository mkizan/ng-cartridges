import { Component, inject, input, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartridgesService } from '../../services/cartridges-service';
import {
  ICartridge,
  ICartridgeLocation,
  ICartridgeLocations,
  ICartridgeStatuses,
  ICartridgeUser,
} from '../../models/cartridge-interfaces';
import { ModalService } from '../../../../core/services/modal/modal-service';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../../../shared/utils/server-url';

@Component({
  selector: 'app-cartridge-form',
  imports: [ReactiveFormsModule],
  templateUrl: './cartridge-form.html',
  styleUrl: './cartridge-form.css',
})
export class CartridgeForm implements OnInit {
  nnfb = new FormBuilder().nonNullable;
  cartridgeData = input<Omit<ICartridge, 'id'> | undefined>();
  constructor(private http: HttpClient) {}

  modalService = inject(ModalService);
  cartridgesService = inject(CartridgesService);
  cartridgeStatuses = this.cartridgesService.allCartridgeStatuses;

  locations = signal<ICartridgeLocation[]>([]);
  users = signal<ICartridgeUser[]>([]);

  cartridgeForm = new FormGroup({
    barcode: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13),
        Validators.pattern(/^\d+$/),
      ],
    }),
    brand: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ],
    }),
    model: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ],
    }),
    alternativeCartridges: new FormControl<string | string[]>('', {
      nonNullable: true,
    }),
    status: new FormControl<any>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    location: new FormControl<any>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ],
    }),
    compatiblePrinters: new FormControl<string | string[]>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(1)],
    }),
    responsible: new FormControl<ICartridgeUser['name']>('Микола', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ],
    }),
    notes: new FormControl('', { nonNullable: true }),
  });

  ngOnInit(): void {
    this.http.get<ICartridgeLocation[]>(`${BASE_URL}/locations`).subscribe({
      next: (data) => {
        this.locations.set(data);
      },
      error: (err) => console.error('Locations error', err),
    });

    this.http.get<ICartridgeUser[]>(`${BASE_URL}/users`).subscribe({
      next: (data) => {
        this.users.set(data);
      },
      error: (err) => console.error('Users error', err),
    });

    if (this.cartridgeData()) {
      this.cartridgeForm.patchValue(this.cartridgeData() as any);
    }
  }

  handleSubmit() {
    if (this.cartridgeForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const altCartridges = this.cartridgeForm.value.alternativeCartridges;
    const compPrinters = this.cartridgeForm.value.compatiblePrinters;
    if (altCartridges && typeof altCartridges === 'string') {
      const arrAltCartridges = altCartridges.trim().split(',');
      this.cartridgeForm.value.alternativeCartridges = arrAltCartridges;
    }
    if (compPrinters && typeof compPrinters === 'string') {
      const arrCompPrinters = compPrinters.trim().split(',');
      this.cartridgeForm.value.compatiblePrinters = arrCompPrinters;
    }
    console.log('Form submit');
    console.log(this.cartridgeForm);
    const cartridgeData = this.cartridgeForm.getRawValue();
    this.cartridgesService.addCartridge(cartridgeData);
    this.modalService.toggleModalBtn();
  }
}
