import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {MatCardModule} from '@angular/material/card';


import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [DashboardComponent, HomeComponent, HistoryComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class DashboardModule { }
