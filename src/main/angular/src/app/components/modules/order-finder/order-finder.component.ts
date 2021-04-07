import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SessionStorageService } from 'ngx-webstorage';
import { ISaleOrderFilter } from 'src/app/filters/sale-order-filter';
import { Session } from 'src/app/interfaces/session';
import { ISaleOrderView } from 'src/app/interfaces/view/sale-order-view';
import { OrderService } from 'src/app/services/order.service';
import { constants } from 'src/environments/environment';
import { SaleOrdersDataSource } from './sale-order-datasource';
import * as moment from "moment";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-finder',
  templateUrl: './order-finder.component.html',
  styleUrls: ['./order-finder.component.scss']
})
export class OrderFinderComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ISaleOrderView>;
  dataSource: SaleOrdersDataSource;
  displayedColumns = ['folio', 'orderDate', 'customer', 'total', 'actions'];

  filter: ISaleOrderFilter = {
    entity: {
      id: undefined,
      uuid: undefined,
      orderDate: undefined,
      customerId: undefined,
      customer: undefined,
      userId: undefined,
      userName: undefined,
      amount: undefined,
      taxes: undefined,
      total: undefined,
      statusId: 1,
      status: undefined,
      saleType: undefined,
      saleTypeId: undefined
    },
    startDate: undefined,
    endDate: undefined,
    hidden: true,
    page: 0,
    rows: 20,
    pageable: true
  }
  filters = {
    customer: undefined
  };

  constructor(private sessionStorage: SessionStorageService, private changeDetectorRefs: ChangeDetectorRef, private orderService: OrderService,
    private dialogRef: MatDialogRef<OrderFinderComponent>) { }

  ngOnInit(): void {
    this.setFilter();
  }

  public pageChangeEvent(event: PageEvent) {
    this.filter.rows = event.pageSize;
    this.filter.page = event.pageIndex;
    this.setFilter();
  }

  setFilter() {
    const session: Session = this.sessionStorage.retrieve(constants.SESSION);
    this.filter.entity.userId = session.user.id;
    this.filter.startDate = moment().startOf("day").toDate();
    this.filter.endDate = moment().endOf("day").toDate();
    this.orderService.filter(this.filter).subscribe(response => {
      this.dataSource = new SaleOrdersDataSource(response.fields.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.count = response.fields.count;
      this.table.dataSource = this.dataSource;
      this.changeDetectorRefs.detectChanges();
    });
  }

  public reprint(row: ISaleOrderView) {
    this.orderService.order(row.uuid).subscribe(response => {
      this.orderService.print(response.fields.entity).subscribe(() => {
        this.dialogRef.close();
      });
    })
  }



}
