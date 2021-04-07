import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { RouterModule } from '@angular/router';
import { CustomMatErrorComponent } from './custom-mat-error/custom-mat-error.component';
import { CustomerSelectorComponent } from './customer-selector/customer-selector.component';
import { ProductEditComponent } from './product-edit/product-edit.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    MainNavigationComponent,
    CustomMatErrorComponent,
    CustomerSelectorComponent,
    ProductEditComponent
  ],
  exports: [
    SpinnerComponent,
    MainNavigationComponent,
    CustomMatErrorComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSnackBarModule,
    MatStepperModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTabsModule,
    MatGridListModule,
    MatSliderModule,
    RouterModule,
  ]
})
export class UIModule { }
