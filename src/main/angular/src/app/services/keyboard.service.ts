import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface KeyboardParameter {
  show: boolean;
  numeric: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {

  private visible: boolean = true;
  private numeric: boolean = false;

  private controller: Subject<KeyboardParameter> = new Subject();

  public $controller: Observable<KeyboardParameter> = this.controller.asObservable();

  constructor(private snackBar: MatSnackBar) { }

  public setVisible(value: boolean) {
    this.visible = value;

    if (this.visible) {
      const snacBarRef = this.snackBar.open('El teclado virtual esta activo', 'Cerrar', {
        duration: 4500
      });

      snacBarRef.onAction().subscribe(() => {
        snacBarRef.dismiss();
      });
    }
  }

  public isVisible(): boolean {
    return this.visible;
  }

  public change(visibility: boolean, numeric: boolean = false) {
    this.numeric = numeric ? numeric : this.numeric;
    const parameter: KeyboardParameter = {
      show: this.visible && visibility,
      numeric: this.numeric
    }
    this.numeric = numeric;
    this.controller.next(parameter);
  }

}
