import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ICustomer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { KeyboardService } from 'src/app/services/keyboard.service';
@Component({
  selector: 'app-customer-selector',
  templateUrl: './customer-selector.component.html',
  styleUrls: ['./customer-selector.component.scss']
})
export class CustomerSelectorComponent implements OnInit {

  displayedColumns = ['businessName', 'contact', 'action'];
  dataSource: MatTableDataSource<ICustomer> = new MatTableDataSource<ICustomer>([]);

  customerFinderForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CustomerSelectorComponent>, private builder: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef, private customerService: CustomerService,
    private keyboardService: KeyboardService) { }

  ngOnInit(): void {

    this.customerFinderForm = this.builder.group({
      customerFinder: ['', Validators.required]
    });
  }

  search() {
    this.customerService.customers(this.customerFinderForm.get('customerFinder').value).subscribe(response => {
      this.dataSource.data = response.fields.data;
      this.changeDetectorRefs.detectChanges();
      this.keyboardService.change(false);
    });
  }

  selectCustomer(customer: ICustomer) {
    this.dialogRef.close(customer);
  }

}
