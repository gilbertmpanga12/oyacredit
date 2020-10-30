import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MobileMoney, SinglePayment, SingleTransaction} from '../../models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mobilemoneydialog',
  templateUrl: './mobilemoneydialog.component.html',
  styleUrls: ['./mobilemoneydialog.component.scss']
})
export class MobilemoneydialogComponent implements OnInit {
  operations = MobileMoney;
  singlePaymentsGroup: FormGroup;
  bulkPaymentsGroup: FormGroup;
  constructor(public dialogRef: MatDialogRef<MobilemoneydialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,  private _single_fb: 
    FormBuilder, private _bulk_fb: FormBuilder, public service: MainService,  private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.singlePaymentsGroup = this._single_fb.group({
      phoneNumber: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      reason: ['', [Validators.required]]
    });
    this.bulkPaymentsGroup = this._bulk_fb.group({
      phoneNumber: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      reason: ['', [Validators.required]]
    });
  }

  uploadBulkPayments(): void{
    console.log('logged');
  }

  uploadSingleTransaction(): void{
    const form = <SinglePayment>this.singlePaymentsGroup.getRawValue();
    this.service.
    singleMobileMoneyTransaction(form.amount,form.phoneNumber,form.reason)
    .subscribe((data: SingleTransaction) => {
      if(data.StatusCode < 300){
        this.dialogRef.close();
        this.openSnackBar('Transaction successfull','OK', 'success');
        return;
      }
      this.openSnackBar('Something went wrong','OK', 'error');
    })
  }

  openSnackBar(message: string, action: string, statusColor:string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: statusColor
    });
  }

}
