import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProgressHttpModule } from 'angular-progress-http';

//API
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
//PIPE


import { MainRoutingModule } from './main-routing.module';
import { WorkflowComponent } from './workflow/workflow.component';
import { ContractComponent } from './contract/contract.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { MainComponent } from './main.component';
import { MaterialModule } from '../_applib/material/material.module';
import { FileManagerComponent } from './file-manager/file-manager.component'; //DIALOG
import { AuthInterceptor } from '../_services/user/auth.interceptor';
import { UserClaims, ChangedPassword } from '../_model/user/user.model';
import { ContractManagerComponent } from './contract-manager/contract-manager.component'; //DIALOG
import { WorkflowService } from '../_services/contract/workflow.service';
import { AdminGuard } from '../_guards/admin.guard';
import { ContractDetailsService } from '../_services/contract/contract-details.service';
import { AppResolver } from '../_resolvers/app.resolver';
import { WorkflowResolver } from '../_resolvers/workflow.resolver';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: true
};


@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ProgressHttpModule,
    MaterialModule,
    PerfectScrollbarModule
  ],
  declarations: [MainComponent, WorkflowComponent, ContractComponent, PreferencesComponent, FileManagerComponent, ContractManagerComponent],
  entryComponents: [FileManagerComponent, ContractManagerComponent],
  providers: [AppResolver, WorkflowResolver, UserClaims, ChangedPassword, WorkflowService, ContractDetailsService , AdminGuard, MainComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class MainModule { }
