import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import {HomeComponent} from './home/home.component';
import {HistoryComponent} from './history/history.component';
import {BanksComponent} from './banks/banks.component';
import {AirtimeComponent} from './airtime/airtime.component';
import {MobilemoneyComponent} from './mobilemoney/mobilemoney.component';
import {MobiledataComponent} from './mobiledata/mobiledata.component'
const routes: Routes = [{ path: '', component: DashboardComponent,
children:[
{
  path: '',
  component: HomeComponent
},
{
  path: 'history',
  component: HistoryComponent
},
{
  path: 'banks',
  component: BanksComponent
},
{
  path: 'airtime',
  component: AirtimeComponent
},
{
  path: 'mobile-money',
  component: MobilemoneyComponent
},
{
  path: 'mobile-data',
  component: MobiledataComponent
}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
