import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DirectivesModule } from './directives/directives.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/common/ui/confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { stompConfig } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DirectivesModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: InjectableRxStompConfig,
      useValue: stompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
