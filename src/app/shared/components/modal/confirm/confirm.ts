import { Component, Inject, inject } from '@angular/core';
import { MatDialogTitle, MatDialogClose, MatDialogActions, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { IConfirmDialog } from '../../../../core/models/confirm-dialog';

@Component({
  selector: 'app-confirm',
  imports: [MatDialogTitle, MatButtonModule, MatDialogClose, MatDialogActions],
  templateUrl: './confirm.html',
  styleUrl: './confirm.scss',
})
export class Confirm {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IConfirmDialog) { }
}
