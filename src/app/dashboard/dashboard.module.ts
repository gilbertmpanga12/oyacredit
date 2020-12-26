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
import { AirtimeComponent } from './airtime/airtime.component';
import { MobiledataComponent } from './mobiledata/mobiledata.component';
import { MobilemoneyComponent } from './mobilemoney/mobilemoney.component';
import { BanksComponent } from './banks/banks.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FusionChartsModule } from 'angular-fusioncharts';
import {MatBadgeModule} from '@angular/material/badge';
import { ApprovalsComponent } from './approvals/approvals.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MobilemoneydialogComponent } from './mobilemoneydialog/mobilemoneydialog.component';
import { MatDividerModule } from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import { BulkcontactsComponent } from './bulkcontacts/bulkcontacts.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EditprofileComponent } from './editprofile/editprofile.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoadMoneyComponent } from './load-money/load-money.component';
import { LoadMoneyDialogComponent } from './load-money-dialog/load-money-dialog.component';
import { LoadingdialogComponent } from './loadingdialog/loadingdialog.component';
import { CollectionhistoryComponent } from './collectionhistory/collectionhistory.component';

@NgModule({
  declarations: [DashboardComponent, HomeComponent, HistoryComponent, AirtimeComponent, MobiledataComponent,
     MobilemoneyComponent, BanksComponent,
      NotificationsComponent, ApprovalsComponent, MobilemoneydialogComponent,  BulkcontactsComponent, EditprofileComponent, SkeletonComponent, LoadMoneyComponent, LoadMoneyDialogComponent, LoadingdialogComponent, CollectionhistoryComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    FusionChartsModule,
    MatBadgeModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatRadioModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule, NgxSkeletonLoaderModule, MatGridListModule, MatMenuModule, LayoutModule,
    MatProgressSpinnerModule, MatSortModule, MatDatepickerModule, MatNativeDateModule ],
  entryComponents: [
    MobilemoneydialogComponent,
    EditprofileComponent
  ]
})
export class DashboardModule { }
