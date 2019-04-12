import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AdminComponent } from './component/admin/admin.component';
import { HomeReportComponent } from './component/home/home-report/home-report.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './service/auth.guard';
import { UnauthorisedComponent } from './component/unauthorised/unauthorised.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['REPORT', 'ADMIN'] },
    children: [
      {
        path : 'report',
        component: HomeReportComponent
      }
    ]
  },
  {path: '401', component: UnauthorisedComponent},
  {path: 'admin', component: AdminComponent , canActivate: [AuthGuard] , data: { roles: ['ADMIN'] }},
  { path: '**', redirectTo: '' }
  // { path: '', redirectTo: '',  pathMatch: 'full' , }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
