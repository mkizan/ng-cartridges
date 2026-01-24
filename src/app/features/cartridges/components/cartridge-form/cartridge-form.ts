import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartridgesService } from '../../services/cartridges-service';
import {
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
  constructor(private http: HttpClient) {}

  modalService = inject(ModalService);
  cartridgesService = inject(CartridgesService);
  cartridgeStatuses = this.cartridgesService.allCartridgeStatuses;

  locations = signal<ICartridgeLocation[]>([]);
  users = signal<ICartridgeUser[]>([]);

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
  }

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
    status: new FormControl<ICartridgeStatuses['status']>('заправлений', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    location: new FormControl<ICartridgeLocations['name']>('Цех 1', {
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

  handleSubmit() {
    if (this.cartridgeForm.invalid) {
      console.log("Form doesn't submit");
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
