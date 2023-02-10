import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtractorComponent } from './extractor.component';
import { CommodityComponent } from './commodity/commodity.component';
import { CityComponent } from './city/city.component';
import { GeneralnotesComponent } from './generalnotes/generalnotes.component';
import { RatesComponent } from './rates/rates.component';

const routes: Routes = [
  {
    path: '',
    component: ExtractorComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: 'commodity',
        component: CommodityComponent
      },
      {
        path: 'city',
        component: CityComponent
      },
      {
        path: 'notes',
        component: GeneralnotesComponent
      },
      {
        path: 'rates',
        component: RatesComponent  
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtractorRoutingModule { }
