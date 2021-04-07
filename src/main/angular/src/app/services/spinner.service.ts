import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../components/common/ui/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private dialogRef;
  open: boolean = false;
  constructor(public dialog: MatDialog) { }

  public show(text?: string) {
    if (!this.open) {
      this.open = true;
      this.dialogRef = this.dialog.open(SpinnerComponent, {
        width: '200px',
        height: '170px',
        disableClose: true,
        data: text
      });
    }
  }

  public hide() {
    if (this.open) {
      this.open = false;
      this.dialogRef.close();
    }
  }


}
