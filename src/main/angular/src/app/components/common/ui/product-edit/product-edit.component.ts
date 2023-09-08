import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Keyboard from 'simple-keyboard';
import { DialogData } from 'src/app/interfaces/dialog-data';
import { IProduct } from 'src/app/interfaces/product';
import { IProductOrder } from 'src/app/interfaces/product-order';
import { KeyboardService } from 'src/app/services/keyboard.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  quantity: number = 0;
  price: number = 0;
  pieces: number = 0;
  product: IProduct;
  keyboard: Keyboard;
  correctPrice: boolean = false;
  correctQuantity: boolean = false;
  correctPieces: boolean = false;
  productOrder: IProductOrder;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private keyboardService: KeyboardService,
    private snackBar: MatSnackBar, private dialogRef: MatDialogRef<ProductEditComponent>, private confirmationDialog: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.productOrder = this.data.entity;
    this.product = this.productOrder.product;
    this.quantity = this.productOrder.quantity;
    this.price = this.productOrder.price;
    this.pieces = this.productOrder.pieces;
  }

  get amount(): number {
    return (this.product && this.quantity != 0) ? this.price * this.quantity : 0;
  }

  public edit() {
    this.productOrder.price = this.price;
    this.productOrder.quantity = this.quantity;
    this.productOrder.pieces = this.pieces;
    this.productOrder.amount = this.price * this.quantity;
    this.dialogRef.close(this.productOrder);
  }

  changeQuantity() {
    if (this.product) {
      this.keyboard = new Keyboard({
        onChange: input => this.onChangeQuantity(input),
        onKeyPress: button => this.onKeyPress(button),
        layout: {
          default: ["1 2 3 {bksp}", "4 5 6 Bascula", "7 8 9 ", " 0 . OK"]
        },
        theme: "hg-theme-default hg-layout-numeric numeric-theme"
      });
      this.keyboard.setInput('0');
      this.keyboardService.change(true, true);
      const subs = this.keyboardService.$controller.subscribe(parameters => {
        subs.unsubscribe();
        if (!parameters.show && !this.correctQuantity) {

        }
      })
    } else {
      this.snackBar.open('Seleccione el producto primero', 'Cerrar', {
        duration: 1500
      });
    }
  }

  changePieces() {
    if (this.product) {
      this.keyboard = new Keyboard({
        onChange: input => this.onChangePieces(input),
        onKeyPress: button => this.onKeyPress(button),
        layout: {
          default: ["1 2 3 {bksp}", "4 5 6 ", "7 8 9 ", " 0 . OK"]
        },
        theme: "hg-theme-default hg-layout-numeric numeric-theme"
      });
      this.keyboard.setInput('');
      this.keyboardService.change(true, true);
      const subs = this.keyboardService.$controller.subscribe(parameters => {
        subs.unsubscribe();
        if (!parameters.show && !this.correctQuantity) {

        }
      })
    } else {
      this.snackBar.open('Seleccione el producto primero', 'Cerrar', {
        duration: 1500
      });
    }
  }

  onChangePieces = (input: string) => {
    if (input.indexOf("OK") >= 1) {
      input = input.replace("OK", "");
    }
    this.pieces = +input;
    if (!isNaN(this.pieces)) {
      this.correctPieces = true;
    } else {
      input = input.substring(0, input.indexOf(".") + 1);
      this.pieces = +input;
      this.keyboard.setInput(input);
      this.correctPieces = false;
    }
  };

  onChangeQuantity = (input: string) => {
    if (input.indexOf("OK") >= 1) {
      input = input.replace("OK", "");
    }
    if (input.indexOf("Bascula") >= 1) {
      input = input.replace("Bascula", "");
      this.keyboard.setInput("0");
      this.keyboardService.change(false);
      this.quantity = 0.00;
    }
    this.quantity = +input;
    if (!isNaN(this.quantity)) {
      this.correctQuantity = true;
    } else {
      input = input.substring(0, input.indexOf(".") + 1);
      this.quantity = +input;
      this.keyboard.setInput(input);
      this.correctQuantity = false;
    }
  };

  onChange = (input: string) => {
    if (input.indexOf("OK") >= 1) {
      input = input.replace("OK", "");
    }
    this.price = +input;
    if (!isNaN(this.price)) {
      const lowerPrice = this.product.price - this.product.maxDiscount;
      const maxPrice = this.product.price + this.product.maxDiscount;
      this.correctPrice = this.price >= lowerPrice && this.price <= maxPrice;
    } else {
      input = input.substring(0, input.indexOf(".") + 1);
      this.price = +input;
      this.keyboard.setInput(input);
      this.correctPrice = false;
    }
  };

  onKeyPress(button: string) {
    if (button === 'OK') {
      this.keyboardService.change(false);
    }
  }

  changePrice() {
    if (this.product) {
      this.keyboard = new Keyboard({
        onChange: input => this.onChange(input),
        onKeyPress: button => this.onKeyPress(button),
        layout: {
          default: ["1 2 3 {bksp}", "4 5 6 ", "7 8 9 ", " 0 . OK"]
        },
        theme: "hg-theme-default hg-layout-numeric numeric-theme"
      });
      this.keyboard.setInput('0');
      this.keyboardService.change(true, true);
      const subs = this.keyboardService.$controller.subscribe(parameters => {
        subs.unsubscribe();
        if (!parameters.show && !this.correctPrice) {
          const lowerPrice = this.product.price - this.product.maxDiscount;
          const maxPrice = this.product.price + this.product.maxDiscount;
          this.keyboard.setInput(this.product.price.toString());
          this.confirmationDialog.showConfirmationDialog('<p>El precio indicado es incorrecto</p> <p>Precio menor permitido: ' + lowerPrice + '</p>' +
            '<p>Precio mayor permitido: ' + maxPrice + '</p>', '450px', 'Aceptar');
        }
      })
    } else {
      this.snackBar.open('Seleccione el producto primero', 'Cerrar', {
        duration: 1500
      });
    }
  }

}
