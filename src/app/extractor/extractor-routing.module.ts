import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtractorComponent } from './extractor.component';
import { CityListComponent } from './city-list/city-list.component';
import { CommodityComponent } from './commodity/commodity.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { ContractGuardService } from './shared/contract-guard.service';
import { StartToolComponent } from './start-tool/start-tool.component';
import { ArbsComponent } from './arbs/arbs.component';
import { RatesComponent } from './rates/rates.component';
import { AuthGuard } from '../_guards/auth.guard';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';

const routes: Routes = [
  {
    path :'',
    component: ExtractorComponent,
    canActivate: [ContractGuardService, AuthGuard],
    children: [
      {
        path: 'start-tool',
        component: StartToolComponent
      },
      {
        path: 'commodity',
        component: CommodityComponent
        
      },
      {
        path: 'contract',
        component: ContractDetailsComponent
      },
      {
        path: 'city',
        component: CityListComponent
      },
      {
        path: 'rateset',
        redirectTo: 'rates',
      },
      {
        path: 'rates',
        component: RatesComponent,
      },
      {
        path: 'arbs',
        component: ArbsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NgProgressModule.forRoot({
      trickleSpeed: 1000,
      min: 20,
      meteor: false,
      color: 'red'
    }),
    NgProgressHttpModule,
    NgProgressRouterModule,
  ],
  exports: [RouterModule]
})
export class ExtractorRoutingModule { }
