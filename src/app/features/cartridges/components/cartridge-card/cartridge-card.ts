import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import {
  LucideAngularModule,
  SquarePen,
  ScanBarcode,
  Pencil,
  Trash2,
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
export class CartridgeCard {
  readonly SquarePen = SquarePen;
  readonly ScanBarcode = ScanBarcode;
  readonly Pencil = Pencil;
  readonly Trash2 = Trash2;
  cartridgesService = inject(CartridgesService);
  cartridgeStatus = this.cartridgesService.allCartridgeStatuses;

  cartridge = input.required<ICartridge>();
  changeCartridgeStatus = output<{ id: string; status: string }>();

  selectStatus(status: string) {
    this.cartridgesService.changeCartridgeStatus({
      id: this.cartridge().id,
      status,
    });
  }

  removeCartridge() {
    this.cartridgesService.removeCartridge(this.cartridge().id);
  }
}
