import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IConfirmDialog } from '../../models/confirm-dialog';
import { Confirm } from '../../../shared/components/modal/confirm/confirm';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly dialog = inject(MatDialog);

  confirmDialog(data: IConfirmDialog): Observable<boolean> {
    return this.dialog.open(Confirm, {data, width: "320px", disableClose: false}).afterClosed();
  }
}
