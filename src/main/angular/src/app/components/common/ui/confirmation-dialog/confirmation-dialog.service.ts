import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(private dialog: MatDialog) { }

  public showConfirmationDialog(message: string, width: string = '350px', labelOk: string = 'Aceptar', labelNo?: string): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: width,
      disableClose: true,
      data: {
        message: message,
        labelOk: labelOk,
        labelNo: labelNo
      }
    });
  }
}
