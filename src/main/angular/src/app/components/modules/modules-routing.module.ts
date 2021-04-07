import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PointOfSaleComponent } from './point-of-sale/point-of-sale.component';
import { MainNavigationComponent } from "../common/ui/main-navigation/main-navigation.component";
import { SessionGuard } from 'src/app/guards/session.guard';
import { ConfigurationComponent } from './configuration/configuration.component';

const routes: Routes = [
  {
    path: '', component: MainNavigationComponent,
    children: [
      { path: 'pos', component: PointOfSaleComponent, canActivate: [SessionGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
