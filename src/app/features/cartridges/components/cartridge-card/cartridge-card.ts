import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import {
  LucideAngularModule,
  SquarePen,
  ScanBarcode,
  Pencil,
  Trash2,
  Printer,
  PrinterCheck,
  PaintBucket,
  User,
  MapPin,
} from 'lucide-angular';
import { TranslateStatusPipe } from '../../../../shared/pipes/translate-status-pipe';
import { ICartridge } from '../../models/cartridge-interfaces';
import { CartridgesService } from '../../services/cartridges-service';

@Component({
  selector: 'app-cartridge-card',
  imports: [LucideAngularModule, TranslateStatusPipe],
  templateUrl: './cartridge-card.html',
  styleUrl: './cartridge-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartridgeCard implements OnInit {
  readonly SquarePen = SquarePen;
  readonly ScanBarcode = ScanBarcode;
  readonly Pencil = Pencil;
  readonly Trash2 = Trash2;
  readonly Printer = Printer;
  readonly PrinterCheck = PrinterCheck;
  readonly PaintBucket = PaintBucket;
  readonly User = User;
  readonly MapPin = MapPin;

  cartridgesService = inject(CartridgesService);
  cartridgeStatus = this.cartridgesService.allCartridgeStatuses;

  cartridge = input.required<ICartridge>();
  changeCartridgeStatus = output<{ id: string; status: string }>();

  ngOnInit(): void {
    // this.cartridgeForm
  }

  selectStatus(status: string) {
    this.cartridgesService.changeCartridgeStatus({
      id: this.cartridge().id,
      status,
    });
  }

  editCartridge() {
    this.cartridgesService.editCartridge(this.cartridge());
  }

  removeCartridge() {
    this.cartridgesService.removeCartridge(this.cartridge().id);
  }
}
