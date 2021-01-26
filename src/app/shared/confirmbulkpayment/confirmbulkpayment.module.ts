import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmbulkpaymentComponent } from './confirmbulkpayment/confirmbulkpayment.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmdialogComponent } from './confirmdialog/confirmdialog.component';



@NgModule({
  declarations: [ConfirmbulkpaymentComponent, ConfirmdialogComponent],
  imports: [
    CommonModule, MatDialogModule, MatButtonModule
  ],
  exports: [ConfirmbulkpaymentComponent, ConfirmdialogComponent]
})
export class ConfirmbulkpaymentModule { }
