import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ModalService } from '../../../../core/services/modal/modal-service';
import { TEXT } from '../../../../core/constants/text';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-add-cartridge',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './add-cartridge.html',
  styleUrl: './add-cartridge.scss',
})
export class AddCartridge {
  protected readonly TEXT = TEXT;
  modalService = inject(ModalService);
}
