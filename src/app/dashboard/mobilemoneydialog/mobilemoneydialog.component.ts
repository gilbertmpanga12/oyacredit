import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {CSV, MobileMoney, SinglePayment, SingleTransaction} from '../../models/models';
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
  telco: string = "MTN";
  telcos: string[] = ['MTN', 'Airtel', 'Others'];
  transactionCost: any = {'MTN': '390', 'Airtel': '300', 'Others':'390'};
  constructor(public dialogRef: MatDialogRef<MobilemoneydialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,  private _single_fb: 
    FormBuilder, public service: MainService,  private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.singlePaymentsGroup = this._single_fb.group({
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
      amount: ['', [Validators.required, Validators.min(500)]],
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
      complete: (results) => {
        this.service.csvResults = results.data;
      }
    },);
    
    
  }

  uploadSingleTransaction(transactionType: string): void{
    this.service.isLoading = true;
    const form = <SinglePayment>this.singlePaymentsGroup.getRawValue();
    let callCode = '256';
    let telephone = form.phoneNumber;
    let msnid = callCode + telephone;
    let amount: string = `${this.incrementWithTelcos(this.telco, form.amount)}`;
    if(form.phoneNumber.startsWith('0') && form.phoneNumber.length == 10){
      msnid= telephone = callCode + telephone.substring(1,);
    }
    this.service.
    manualTransaction(amount,msnid, form.reason, transactionType)
    .subscribe((data: any) => {
      if(data["AutoCreate"]["Response"][0]["Status"] == "OK"){
        this.service.isLoading = false;
        this.dialogRef.close();
        this.openSnackBar('Transaction successful','OK', 'success');
        return;
      }
      this.service.isLoading = false;
      this.openSnackBar(data["AutoCreate"]["Response"][0]["StatusMessage"],'OK', 'error');
    }, err => {
      this.service.isLoading = false;
      this.openSnackBar('Something went wrong','OK', 'error');
    });
  }

  incrementWithTelcos(telco: string, total: string): number{
    if(parseInt(total) <= 600){
      if(telco == "MTN"){
        return parseInt(total) + 390;
      }else if(telco == "Airtel"){
        return parseInt(total) + 300;
      }else{
        return parseInt(total) + 390;
      }
    }else{
      return parseInt(total);
    }
  }





  openSnackBar(message: string, action: string, statusColor:string) {
    this._snackBar.open(message, action, {
      duration: 7000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: statusColor
    });
  }

}
