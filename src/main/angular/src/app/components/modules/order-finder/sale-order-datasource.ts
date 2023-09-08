import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ISaleOrderView } from 'src/app/interfaces/view/sale-order-view';


/**
 * Data source for the SaleOrders view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SaleOrdersDataSource extends DataSource<ISaleOrderView> {
  data: Array<ISaleOrderView> = [];
  paginator: MatPaginator;
  sort: MatSort;
  count: number;

  constructor(data: Array<ISaleOrderView>) {
    super();
    this.data = data;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Array<ISaleOrderView>> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Array<ISaleOrderView>) {
    return data;
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Array<ISaleOrderView>) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a: ISaleOrderView, b: ISaleOrderView) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'customer': return compare(a.customer, b.customer, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        case 'userName': return compare(a.userName, b.userName, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
