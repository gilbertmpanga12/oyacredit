import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [{ path: '', 
component: AppComponent,
children: [
  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
] }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
