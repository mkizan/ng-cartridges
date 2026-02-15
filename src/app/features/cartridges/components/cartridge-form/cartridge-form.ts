import {
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartridgesService } from '../../services/cartridges-service';
import {
  CartridgeStatus,
  ICartridge,
  ICartridgeLocation,
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
  private formBuilder = inject(FormBuilder).nonNullable;
  protected readonly TEXT = TEXT;

  cartridgeData = input<ICartridge | undefined>();
  // success = output<void>();

  constructor(private http: HttpClient) {}

  modalService = inject(ModalService);
  cartridgesService = inject(CartridgesService);
  cartridgeStatuses = this.cartridgesService.allCartridgeStatuses;

  locations = signal<ICartridgeLocation[]>([]);
  users = signal<ICartridgeUser[]>([]);

  cartridgeForm = this.formBuilder.group({
    barcode: [
      '',
      [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13),
        Validators.pattern(/^\d+$/),
      ],
    ],
    brand: ['', [Validators.required, Validators.minLength(2)]],
    model: ['', [Validators.required, Validators.minLength(2)]],
    alternativeCartridges: <string | string[]>[''],
    status: ['', [Validators.required]],
    location: ['', [Validators.required, Validators.minLength(2)]],
    compatiblePrinters: <string | string[]>[
      '',
      [Validators.required, Validators.minLength(1)],
    ],
    responsible: ['', [Validators.required, Validators.minLength(2)]],
    notes: [''],
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
    if (this.cartridgeForm.invalid) return;

    const cartridgeFormData = this.cartridgeForm.getRawValue();

    const payload = {
      ...cartridgeFormData,
      status: cartridgeFormData.status as CartridgeStatus,
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

    console.log('Payload: ', payload);

    if (this.cartridgeData()) {
      this.cartridgesService.editCartridge(this.cartridgeData()!.id, payload);
      // this.modalService.toggleModalBtn();
      this.modalService.closeModal();
    } else {
      this.cartridgesService.addCartridge(payload);
      // this.modalService.toggleModalBtn();
      this.modalService.closeModal();
      this.cartridgeForm.reset();
    }
  }

  get barcode() {
    return this.cartridgeForm.get('barcode');
  }
  get brand() {
    return this.cartridgeForm.get('brand');
  }
  get model() {
    return this.cartridgeForm.get('model');
  }
  get alternativeCartridges() {
    return this.cartridgeForm.get('alternative-cartridges');
  }
  get compatiblePrinters() {
    return this.cartridgeForm.get('compatiblePrinters');
  }
  get status() {
    return this.cartridgeForm.get('status');
  }
  get responsible() {
    return this.cartridgeForm.get('responsible');
  }
  get location() {
    return this.cartridgeForm.get('location');
  }
  get notes() {
    return this.cartridgeForm.get('notes');
  }
}
