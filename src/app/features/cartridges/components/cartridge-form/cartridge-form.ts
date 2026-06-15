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
import { LocationsService } from '../../../locations/services/locations-service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-cartridge-form',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButton,
    MatSelect,
    MatOption,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './cartridge-form.html',
  styleUrl: './cartridge-form.scss',
})
export class CartridgeForm implements OnInit {
  locationsService = inject(LocationsService);
  locations = this.locationsService.readLocations;
  private formBuilder = inject(FormBuilder).nonNullable;
  protected readonly TEXT = TEXT;

  cartridgeData = input<ICartridge | undefined>();
  success = output<void>();

  constructor(private http: HttpClient) {}

  modalService = inject(ModalService);
  cartridgesService = inject(CartridgesService);
  cartridgeStatuses = this.cartridgesService.allCartridgeStatuses;

  // locations = signal<ICartridgeLocation[]>([]);
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
    location: ['', [Validators.required]],
    compatiblePrinters: <string | string[]>[
      '',
      [Validators.required, Validators.minLength(1)],
    ],
    responsible: ['', [Validators.required, Validators.minLength(2)]],
    refillDate: ['', [Validators.required]],
    quantityPages: [0, [Validators.required, Validators.min(0)]],
    notes: [''],
  });

  ngOnInit(): void {
    this.locationsService.getLocations();

    this.http.get<ICartridgeUser[]>(`${BASE_URL}/persons`).subscribe({
      next: (data) => {
        this.users.set(data);
      },
      error: (err) => console.error('Users error', err),
    });

    const data = this.cartridgeData();
    if (data) {
      this.cartridgeForm.patchValue({
        ...data,
        location: data.location.id ?? '', // витягуємо тільки id з об'єкта location для форми, оскільки форма очікує рядок (id), а не об'єкт
      });
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
      refillDate: new Date(cartridgeFormData.refillDate!).toISOString(),
      // витягуємо тільки id з об'єкта location
      location:
        typeof cartridgeFormData.location === 'object' &&
        cartridgeFormData.location !== null
          ? (cartridgeFormData.location as any).id
          : cartridgeFormData.location,
    };

    console.log('Payload: ', payload);

    const data = this.cartridgeData();
    if (data) {
      console.log('Barcode type: ', typeof payload.barcode);
      this.cartridgesService.editCartridge(data.id, payload);
      this.success.emit();
    } else {
      this.cartridgesService.addCartridge(payload);
      this.success.emit();
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
  get refillDate() {
    return this.cartridgeForm.get('refillDate');
  }
  get quantityPages() {
    return this.cartridgeForm.get('quantityPages');
  }
  get notes() {
    return this.cartridgeForm.get('notes');
  }
}
