import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { ContractComponent } from './contract/contract.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { AuthGuard } from '../_guards/auth.guard';
import { AdminGuard } from '../_guards/admin.guard';
import { ExtractorComponent } from './extractor/extractor.component';
import { AppResolver } from '../_resolvers/app.resolver';
import { WorkflowResolver } from '../_resolvers/workflow.resolver';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    resolve: {
      cres: AppResolver
    },
    children: [
      {
        path: 'workflow',
        component: WorkflowComponent,
        resolve:{
          cres: WorkflowResolver
        }
      },
      {
        path: 'extractor',
        loadChildren: 'src/app/main/extractor/extractor.module#ExtractorModule'
      },
      {
        path: 'library',
        loadChildren: 'src/app/main/library/library.module#LibraryModule',
        canActivate: [AdminGuard]
      },
      {
        path: 'contract',
        component: ContractComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'system',
        loadChildren : 'src/app/main/system/system.module#SystemModule',
        canActivate: [AdminGuard]
      },
      {
        path: 'preferences',
        component: PreferencesComponent
      },
      {
        path: '',
        redirectTo: 'workflow',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
