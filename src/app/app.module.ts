import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
//MATERIAL 
import { MaterialModule } from './_applib/material/material.module';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './_services/user/user.service';
import { AuthGuard } from './_guards/auth.guard';
import { AuthInterceptor } from './_services/user/auth.interceptor';
import { ContractGuardService } from './extractor/shared/contract-guard.service';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { ProgressHttpModule } from '../../node_modules/angular-progress-http';
import { AppResolver } from './_resolvers/app.resolver';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    //FORM
    FormsModule,
    ReactiveFormsModule,

    //MATERIAL
    MaterialModule,
    //SCROLL BAR

    //HTTP CLIENT
    HttpModule,
    HttpClientModule,
    ProgressHttpModule,
    NgProgressModule.forRoot({
      trickleSpeed: 1000,
      min: 20,
      meteor: false,
      color: 'red'
    }),
    NgProgressHttpModule,
    NgProgressRouterModule,

    //TOASTR
    ToastrModule.forRoot()
  ],
  providers: [UserService, AuthGuard, ContractGuardService,AppResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
