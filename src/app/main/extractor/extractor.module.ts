import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//API
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
//PIPE
import { SurchargeIncluded, SurchargeNotIncluded } from '../../_services/contract/surcharge.pipe';

import { MaterialModule } from '../../_applib/material/material.module';
import { ExtractorRoutingModule } from './extractor-routing.module';
import { ExtractorComponent } from './extractor.component';
import { CommodityComponent } from './commodity/commodity.component';
import { CommodityService } from '../../_services/contract/commodity.service';
import { CommodityDialogComponent } from './commodity/commodity-dialog/commodity-dialog.component';
import { CityComponent } from './city/city.component';
import { GeneralnotesComponent } from './generalnotes/generalnotes.component';
import { NotesDirectComponent } from './generalnotes/notes-direct/notes-direct.component';
import { NotesSpecificComponent } from './generalnotes/notes-specific/notes-specific.component';
import { SurchargeService } from 'src/app/_services/contract/surcharge-service';
import { NotesService } from 'src/app/_services/contract/notes.service';
import { SystemService } from 'src/app/_services/system/system.service';
import { RatesComponent } from './rates/rates.component';
import { CityListService } from 'src/app/_services/contract/city-list.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: true
};



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExtractorRoutingModule,
    MaterialModule,
    PerfectScrollbarModule
  ],
  declarations: [ExtractorComponent, CommodityComponent, CommodityDialogComponent, CityComponent, GeneralnotesComponent, NotesDirectComponent,
  NotesSpecificComponent, SurchargeIncluded, SurchargeNotIncluded, RatesComponent],
  entryComponents: [CommodityDialogComponent, NotesDirectComponent, NotesSpecificComponent],
  providers:[ CommodityService, SurchargeService, NotesService, SystemService, CityListService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class ExtractorModule { }
