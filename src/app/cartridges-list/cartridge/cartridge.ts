import {
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { TranslateStatusPipe } from '../../pipes/translate-status-pipe';

export interface ICartridge {
  id: number;
  brand: string;
  model: string;
  analog: string[];
  compatiblePrinters: string[];
  ean13: string;
  status: string;
}

interface ICartridgeStatuses {
  id: number;
  status: string;
  state: string;
}

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
    { id: 1, status: 'заправлений', state: 'filled' },
    { id: 2, status: 'на заправці', state: 'on-filler' },
    { id: 3, status: 'в принтері', state: 'in-printer' },
    { id: 4, status: 'закінчився', state: 'ended' },
    { id: 5, status: 'в ремонті', state: 'on-repair' },
    { id: 6, status: 'неробочий', state: 'non-working' },
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
