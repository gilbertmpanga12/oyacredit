import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import {HomeComponent} from './home/home.component';
import {HistoryComponent} from './history/history.component';
import {BanksComponent} from './banks/banks.component';
import {AirtimeComponent} from './airtime/airtime.component';
import {MobilemoneyComponent} from './mobilemoney/mobilemoney.component';
import {MobiledataComponent} from './mobiledata/mobiledata.component'
import { NotificationsComponent } from './notifications/notifications.component';
import {LoadMoneyComponent} from './load-money/load-money.component';

const routes: Routes = [{ path: '', component: DashboardComponent,
children:[
{
  path: '',
  component: HomeComponent,
  data: {animation: "HomePage"}
},
{
  path: 'history',
  component: HistoryComponent,
  data: {animation: "HistoryPage"}
},
{
  path: 'banks',
  component: BanksComponent,
  data: {animation: "BanksPage"}
},
{
  path: 'airtime',
  component: AirtimeComponent,
  data: {animation: "AirtimePage"}
},
{
  path: 'mobile-money',
  component: MobilemoneyComponent,
  data: {animation: "MobileMoneyPage"}
},
{
  path: 'mobile-data',
  component: MobiledataComponent,
  data: {animation: "MobileDataPage"}
},
{
  path: 'notifications',
  component: NotificationsComponent,
  data: {animation: "NotificationsPage"}
},
{
  path: 'load-money',
  component: LoadMoneyComponent,
  data: {animation: 'LoadMoneyPage'}
}

] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
