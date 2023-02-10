import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoadingPageComponent } from './loading-page/loading-page.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'main',
        loadChildren: 'src/app/main/main.module#MainModule'
    },
    {
        path: 'extractor',
        loadChildren: 'src/app/extractor/extractor.module#ExtractorModule'
    },                              
    {
        path: '',
        redirectTo: '/main/workflow',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: LoadingPageComponent
    }
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [ RouterModule ],
    providers: []
})
export class AppRoutingModule{ }