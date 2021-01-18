import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmbulkpaymentComponent } from './confirmbulkpayment/confirmbulkpayment.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [ConfirmbulkpaymentComponent],
  imports: [
    CommonModule, MatDialogModule, MatButtonModule
  ],
  exports: [ConfirmbulkpaymentComponent]
})
export class ConfirmbulkpaymentModule { }
