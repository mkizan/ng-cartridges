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
import { TEXT } from '../../../../core/constants/text';

@Component({
  selector: 'app-cartridge-form',
  imports: [ReactiveFormsModule],
  templateUrl: './cartridge-form.html',
  styleUrl: './cartridge-form.css',
})
export class CartridgeForm implements OnInit {
  // nnfb = new FormBuilder().nonNullable;
  protected readonly TEXT = TEXT;
  cartridgeData = input<ICartridge | undefined>();
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
      validators: [Validators.required, Validators.minLength(2)],
    }),
    model: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
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
      validators: [Validators.required, Validators.minLength(2)],
    }),
    compatiblePrinters: new FormControl<string | string[]>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(1)],
    }),
    responsible: new FormControl<ICartridgeUser['name']>('Микола', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
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
      console.log(this.cartridgeForm);
      console.log('Form is invalid');
      return;
    }

    const cartridgeFormData = this.cartridgeForm.getRawValue();

    const payload = {
      ...cartridgeFormData,
      alternativeCartridges:
        typeof cartridgeFormData.alternativeCartridges === 'string'
          ? cartridgeFormData.alternativeCartridges
              .split(',')
              .map((s) => s.trim())
              .filter((s) => s !== '')
          : cartridgeFormData.alternativeCartridges,

      compatiblePrinters:
        typeof cartridgeFormData.compatiblePrinters === 'string'
          ? cartridgeFormData.compatiblePrinters
              .split(',')
              .map((s) => s.trim())
              .filter((s) => s !== '')
          : cartridgeFormData.compatiblePrinters,
    };

    console.log(payload);

    if (this.cartridgeData()) {
      this.cartridgesService.editCartridge(this.cartridgeData()!.id, payload);
      this.modalService.toggleModalBtn();
    } else {
      this.cartridgesService.addCartridge(payload);
      this.modalService.toggleModalBtn();
    }
  }
}
