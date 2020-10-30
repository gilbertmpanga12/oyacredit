import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MobileMoney, SinglePayment, SingleTransaction} from '../../models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as Papa from 'papaparse';

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
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
      amount: ['', [Validators.required, Validators.min(1000)]],
      reason: ['', [Validators.required]]
    });
    this.bulkPaymentsGroup = this._bulk_fb.group({
      phoneNumber: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      reason: ['', [Validators.required]]
    });
  }

  uploadBulkPayments(event: FileList): void{
    this.service.isLoading = true;
    const file = event.item(0);
    
    if (file.type.split('/')[0] == 'image' || 
    file.type.split('/')[0] == 'video'
     || file.type.split('/')[0] == 'video') { 
      alert('Please enter only documents');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        let resultsPaylod = results.data;
        console.log(resultsPaylod);
      }
    },);
    
    // this.service.
    // bulkMobileMoneyTransactiosn()
    // .subscribe((data: any) => {
    //   if(data["AutoCreate"]["Response"][0]["Status"] == "OK"){
    //     this.service.isLoading = false;
    //     this.dialogRef.close();
    //     this.openSnackBar('Transaction successful','OK', 'success');
    //     return;
    //   }
    //   this.service.isLoading = false;
    //   this.openSnackBar('Something went wrong','OK', 'error');
    // }, err => {
    //   this.service.isLoading = false;
    //   this.openSnackBar('Something went wrong','OK', 'error');
    // });
  }

  uploadSingleTransaction(): void{
    this.service.isLoading = true;
    const form = <SinglePayment>this.singlePaymentsGroup.getRawValue();
    let callCode = '256';
    let telephone = form.phoneNumber;
    let msnid = callCode + telephone;

    if(form.phoneNumber.startsWith('0') && form.phoneNumber.length == 10){
      msnid= telephone = callCode + telephone.substring(1,);
    }
    this.service.
    singleMobileMoneyTransaction(form.amount,msnid,form.reason)
    .subscribe((data: any) => {
      if(data["AutoCreate"]["Response"][0]["Status"] == "OK"){
        this.service.isLoading = false;
        this.dialogRef.close();
        this.openSnackBar('Transaction successful','OK', 'success');
        return;
      }
      this.service.isLoading = false;
      this.openSnackBar('Something went wrong','OK', 'error');
    }, err => {
      this.service.isLoading = false;
      this.openSnackBar('Something went wrong','OK', 'error');
    });
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
