import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PrintingTableComponent } from './printing-table/printing-table.component';
import {MainGuard} from './services/main.guard';

const routes: Routes = [{ path: '', 
component: AppComponent,
canActivateChild: [MainGuard],
children: [
  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), }
] }, 
{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
{path: 'print-reports/:url', component: PrintingTableComponent} // , canActivate: [MainGuard]
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
