import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingdialogComponent } from '../loadingdialog/loadingdialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [LoadingdialogComponent],
  imports: [
    CommonModule, MatProgressSpinnerModule, MatDialogModule, MatButtonModule
  ],
  exports: [LoadingdialogComponent],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
  }]
})
export class LoadingSpinnerModule { }
