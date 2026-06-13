import { Component, inject } from '@angular/core';
import { ModalService } from '../../../../core/services/modal/modal-service';
import { TEXT } from '../../../../core/constants/text';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-location',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './add-location.html',
  styleUrl: './add-location.scss',
})
export class AddLocation {
  protected readonly TEXT = TEXT;
  modalService = inject(ModalService);
}
