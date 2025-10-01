import {
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { TranslateStatusPipe } from '../../../../shared/pipes/translate-status-pipe';
import {
  ICartridge,
  ICartridgeStatuses,
} from '../../models/cartridge-interfaces';

@Component({
  selector: 'app-cartridge',
  imports: [TranslateStatusPipe],
  templateUrl: './cartridge.html',
  styleUrl: './cartridge.css',
})
export class Cartridge {
  cartridge = input.required<ICartridge>();
  changeCartridgeStatus = output<{ id: number; status: string }>();
  isActionsVisible = true;
  contentActionsBtn = viewChild<ElementRef<HTMLDivElement>>('actionsWrapper');

  cartridgeStatus = signal<ICartridgeStatuses[]>([
    { id: 1, status: 'заправлений' },
    { id: 2, status: 'на заправці' },
    { id: 3, status: 'в принтері' },
    { id: 4, status: 'закінчився' },
    { id: 5, status: 'в ремонті' },
    { id: 6, status: 'неробочий' },
  ]);

  selectStatus(status: string) {
    return this.changeCartridgeStatus.emit({
      id: this.cartridge().id,
      status,
    });
  }

  toggleActionsBtn() {
    this.isActionsVisible = !this.isActionsVisible;
  }
}
