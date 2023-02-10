import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../_applib/material/material.module';
import { LibraryRoutingModule } from './library-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LibraryComponent } from './library.component';
import { EntryComponent } from './entry/entry.component';

@NgModule({
  imports: [
    CommonModule,
    LibraryRoutingModule,
    MaterialModule
  ],
  declarations: [LibraryComponent, DashboardComponent, EntryComponent]
})
export class LibraryModule { }
