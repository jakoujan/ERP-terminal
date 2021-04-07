import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { IProductViewFilter } from 'src/app/filters/product-filter';
import { IProductOrder } from 'src/app/interfaces/product-order';
import { IProductType } from 'src/app/interfaces/product-type';
import { IProductView } from 'src/app/interfaces/view/product-view';
import { CatalogsService } from 'src/app/services/catalogs.service';
import { ProductService } from 'src/app/services/product.service';
import { constants, environment } from 'src/environments/environment';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { RxStompService } from '@stomp/ng2-stompjs';
import { IProduct } from 'src/app/interfaces/product';
import { ISaleType } from 'src/app/interfaces/sale-type';
import { ISaleOrder } from 'src/app/interfaces/sale-order';
import { ICustomer } from 'src/app/interfaces/customer';
import { MatDialog } from '@angular/material/dialog';
import { CustomerSelectorComponent } from '../../common/ui/customer-selector/customer-selector.component';
import { SessionStorageService } from 'ngx-webstorage';
import { Session } from 'src/app/interfaces/session';
import { OrderService } from 'src/app/services/order.service';
import { ConfirmationDialogService } from '../../common/ui/confirmation-dialog/confirmation-dialog.service';
import Keyboard from 'simple-keyboard';
import { KeyboardService } from 'src/app/services/keyboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductEditComponent } from '../../common/ui/product-edit/product-edit.component';
import { OrderFinderComponent } from '../order-finder/order-finder.component';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.scss']
})
export class PointOfSaleComponent implements OnInit {

  keyboard: Keyboard;
  displayedColumns = ['shortDescription', 'pieces', 'quantity', 'amount', 'actions'];
  quantity: number = 0;
  price: number = 0;
  pieces: number = 0;
  qamount: number;
  qtax: number;
  customer: ICustomer = {
    businessName: "VENTA AL PUBLICO",
    contact: "N/A",
    id: 1,
    uuid: "cd8429ad-34c1-4a14-9762-a1907c54954d"
  };
  saleType: ISaleType = {
    id: 1,
    type: "CONTADO",
    prefix: "EF"
  };
  scale: boolean = true;
  @ViewChild(MatTable) table: MatTable<IProductOrder>;
  dataSource: MatTableDataSource<IProductOrder> = new MatTableDataSource<IProductOrder>([]);

  products: Array<IProductView> = [];
  productTypes: Array<IProductType> = [];
  saleTypes: Array<ISaleType> = [];
  product: IProduct;
  order: ISaleOrder = {
    amount: 0,
    customer: {
      businessName: "VENTA AL PUBLICO",
      contact: "N/A",
      id: 1,
      uuid: "cd8429ad-34c1-4a14-9762-a1907c54954d"
    },
    id: undefined,
    orderDate: undefined,
    products: [],
    taxes: 0,
    total: 0,
    saleType: this.saleType,
    user: undefined,
    uuid: undefined
  };

  productFilter: IProductViewFilter = {
    entity: {
      id: undefined,
      unitId: undefined,
      unit: undefined,
      productTypeId: undefined,
      productType: undefined,
      uuid: undefined,
      code: undefined,
      shortDescription: undefined,
      longDescription: undefined,
      active: undefined,
    },
    startDate: undefined,
    endDate: undefined,
    hidden: true,
    page: 0,
    rows: 20,
    pageable: false
  }
  correctPrice: boolean = false;
  correctQuantity: boolean = false;
  correctPieces: boolean = false;


  constructor(private productService: ProductService, private catalogService: CatalogsService,
    private rxStompService: RxStompService, private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog, private sessionStorage: SessionStorageService, private orderService: OrderService,
    private confirmationDialog: ConfirmationDialogService, private keyboardService: KeyboardService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.catalogService.getProductTypes().subscribe(productTypes => this.productTypes = productTypes);
    this.catalogService.getSaleTypes().subscribe(saleTypes => this.saleTypes = saleTypes);

    let subscription: Subscription = this.rxStompService.watch(environment.websocket.topicPrefix).subscribe((message: Message) => {
      if (this.scale) {
        const response = JSON.parse(message.body);
        if (!response.code) {
          this.quantity = response.value;
        }
      }
    });
  }

  onProductTypeSelect(productType: IProductType) {
    this.productFilter.entity.productTypeId = productType.id;
    this.productService.filter(this.productFilter).subscribe(response => this.products = response.fields.data);
  }

  onProductSelection(productView: IProductView) {
    this.productService.findProduct(productView.id).subscribe(response => {
      this.product = response.fields.entity;
      this.correctPrice = true;
      this.price = this.product.price;
      this.scale = true;
    });
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
          const maxiumPrice = this.product.price + this.product.maxDiscount;
          this.keyboard.setInput(this.product.price.toString());
          this.confirmationDialog.showConfirmationDialog('<p>El precio indicado es incorrecto</p> <p>Precio menor permitido: ' + lowerPrice + '</p>' +
            '<p>Precio mayor permitido: ' + maxiumPrice + '</p>', '450px', 'Aceptar');
        }
      })
    } else {
      this.snackBar.open('Seleccione el producto primero', 'Cerrar', {
        duration: 1500
      });
    }
  }

  changeQuantity() {
    if (this.product) {
      this.scale = false;
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
      this.scale = true;
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

  get customerName(): string {
    return this.customer ? this.customer.businessName : 'Seleccionar cliente';
  }

  get saleTypeSelection(): string {
    return this.saleType ? this.saleType.type : 'Seleccionar';
  }

  saleTypeSelectionChange(type: ISaleType) {
    this.saleType = type;
  }

  get longDescription(): string {
    return this.product ? this.product.longDescription : '';
  }

  get amount(): number {
    return (this.product && this.quantity != 0) ? this.price * this.quantity : 0;
  }

  get addProductButtonDisabled(): boolean {
    return !(this.product && this.quantity != 0 && this.correctPrice);
  }

  findCustomer() {
    const dialogRef = this.dialog.open(CustomerSelectorComponent, {
      width: '980px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(customer => {
      if (customer) {
        this.customer = customer;
      }
    })
  }

  addProduct() {
    this.order.products.unshift({
      id: undefined,
      amount: this.amount,
      price: this.price,
      product: this.product,
      quantity: this.quantity,
      pieces: this.pieces
    });
    this.price = 0;
    this.pieces = 0;
    this.dataSource.data = this.order.products;
    this.changeDetectorRefs.detectChanges();
    this.product = undefined;
    this.scale = true;
  }

  edit(product: IProductOrder) {
    this.dialog.open(ProductEditComponent, {
      width: '450px',
      disableClose: true,
      data: { entity: product }
    }).beforeClosed().subscribe((p) => {
      if (p) {
        product = p;
      }
    });
  }


  delete(product: IProductOrder) {
    const index = this.order.products.indexOf(product);
    this.order.products.splice(index, 1);
    this.dataSource.data = this.order.products;
    this.changeDetectorRefs.detectChanges();
  }

  get totalAmount(): number {
    this.qamount = 0;
    this.order.products.forEach(p => {
      this.qamount += (p.price * p.quantity);
    })
    return this.qamount;
  }

  get tax(): number {
    this.qtax = 0;
    this.order.products.forEach(p => {
      this.qtax += ((p.price * p.quantity) * (p.product.tax.percentage / 100));
    })
    return this.qtax;
  }

  get total(): number {
    return this.qtax + this.qamount;
  }

  readyToPay(): boolean {
    return this.order.products.length === 0 || !this.customer || !this.saleType;
  }

  cancelOrder() {
    this.confirmationDialog.showConfirmationDialog("¿Desea cancelar la orden?", '450px', 'Si', 'No').afterClosed().subscribe((accept) => {
      if (accept) {
        this.cleanOrder();
      }
    });
  }

  save() {
    const session: Session = this.sessionStorage.retrieve(constants.SESSION);

    this.order.customer = this.customer;
    this.order.taxes = this.qtax;
    this.order.total = this.total;
    this.order.user = session.user;
    this.order.amount = this.totalAmount;
    this.order.saleType = this.saleType;
    this.order.products = this.order.products.reverse();
    this.orderService.save(this.order).subscribe(response => {
      if (response.code === 0) {
        this.orderService.print(response.fields.order).subscribe(() => {
          this.confirmationDialog.showConfirmationDialog(response.message, '450px', 'Aceptar').afterClosed().subscribe(() => {
            this.cleanOrder();
          });
        });

      } else {
        this.confirmationDialog.showConfirmationDialog(response.message, '450px', 'Aceptar');
      }
    });

  }

  public reprint() {
    this.dialog.open(OrderFinderComponent, {
      width: '850px',
      disableClose: true,
    });
  }

  cleanOrder() {
    this.order = {
      amount: 0,
      customer: {
        businessName: "VENTA AL PUBLICO",
        contact: "N/A",
        id: 1,
        uuid: "cd8429ad-34c1-4a14-9762-a1907c54954d"
      },
      id: undefined,
      orderDate: undefined,
      products: [],
      taxes: 0,
      total: 0,
      saleType: {
        id: 1,
        type: "CONTADO",
        prefix: "EF"
      },
      user: undefined,
      uuid: undefined
    }
    this.product = undefined,
      this.price = 0;
    this.customer = {
      businessName: "VENTA AL PUBLICO",
      contact: "N/A",
      id: 1,
      uuid: "cd8429ad-34c1-4a14-9762-a1907c54954d"
    };
    this.saleType = {
      id: 1,
      type: "CONTADO",
      prefix: "EF"
    };
    this.dataSource.data = [];
    this.catalogService.getProductTypes().subscribe(productTypes => this.productTypes = productTypes);
    this.catalogService.getSaleTypes().subscribe(saleTypes => this.saleTypes = saleTypes);
    this.changeDetectorRefs.detectChanges();
  }

}
