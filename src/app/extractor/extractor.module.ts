import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProgressHttpModule } from 'angular-progress-http';


//NgProgress

import { AuthInterceptor } from '../_services/user/auth.interceptor';
//MATERIAL MODULE
import { MaterialModule } from '../_applib/material/material.module';

//SERVICES
import { ContractGuardService } from './shared/contract-guard.service';
import { SurchargeIncluded, SurchargeNotIncluded } from './shared/surcharges/surcharge.pipe';


import { ExtractorRoutingModule } from './extractor-routing.module';
import { ExtractorComponent } from './extractor.component';
import { CityListComponent } from './city-list/city-list.component';
import { CityListDialogComponent } from './city-list/city-list-dialog/city-list-dialog.component';
import { CommodityComponent } from './commodity/commodity.component';
import { CommodityDialogComponent } from './commodity/commodity-dialog/commodity-dialog.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { StartToolComponent } from './start-tool/start-tool.component';
import { MiscComponent } from './misc/misc.component';
import { RatesComponent } from './rates/rates.component';
import { RatesDialogComponent } from './rates/rates-dialog/rates-dialog.component';
import { ArbsComponent } from './arbs/arbs.component';
import { ArbsDialogComponent } from './arbs/arbs-dialog/arbs-dialog.component';
import { RatesSpecialDialogComponent } from './rates/rates-special-dialog/rates-special-dialog.component';
import { ContractService } from './shared/contract.service';
import { ConvertDialogComponent } from './convert-dialog/convert-dialog.component';
import { AuthGuard } from '../_guards/auth.guard';
import { ContractDetailsService } from '../_services/contract/contract-details.service';
import { ContractDetails } from '../_model/contract/contract-details.model';
import { CommodityService } from '../_services/contract/commodity.service';
import { CityListService } from '../_services/contract/city-list.service';
import { FreetimeComponent } from './freetime/freetime.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ProgressHttpModule,
    ExtractorRoutingModule,
    //MATERIAL MODULES
    MaterialModule,
    //NgProgress
  ],
  declarations: 
  [ 
    StartToolComponent, ExtractorComponent, CommodityComponent, CityListComponent, 
    ContractDetailsComponent, CityListDialogComponent, CityListDialogComponent, 
    CommodityDialogComponent, MiscComponent, RatesComponent, RatesDialogComponent, 
    ArbsComponent, ArbsDialogComponent, RatesSpecialDialogComponent, SurchargeIncluded, 
    SurchargeNotIncluded, ConvertDialogComponent, FreetimeComponent
  ],
  entryComponents: 
  [
    CityListDialogComponent, CommodityDialogComponent, RatesDialogComponent, 
    RatesSpecialDialogComponent, ArbsDialogComponent, ConvertDialogComponent
  ],
  providers: 
  [
    ContractGuardService, 
    ContractService, 
    AuthGuard, 
    ContractDetailsService, 
    ContractDetails, 
    CommodityService,
    CityListService,
    {
    provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
]
})
export class ExtractorModule { }
