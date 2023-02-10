import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SystemRoutingModule } from './system-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { SystemComponent } from './system.component';
import { MaterialModule } from '../../_applib/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    SystemRoutingModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [SystemComponent, DashboardComponent, UsersComponent]
})
export class SystemModule { }
