import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {CSV, MobileMoney, SinglePayment, SingleTransaction} from '../../models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as Papa from 'papaparse';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

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
  charge: string = "300";
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
        this.service.csvResults.forEach((amount: CSV) => {
          this.service.bulkTotal += parseInt(amount.Amount);
          this.service.actualAmount = `${this.service.bulkTotal}`;
        });
        this.service.isLoading = false;
      }
    },);

    this.dialogRef.afterClosed().subscribe(() => {
      this.service.resetToDefaults();
    })
    
  }

  checkBulkPayment(): void{
    this.service.bulkTransactionReady = false;
  }

  sendBulkTransation(): void {
    this.service.isLoading = true;
    let xml = this.service.csvResults.map((cell: CSV) => {
      return "<Beneficiary>" + "<Amount>" + cell.Amount + "</Amount>"+ 
              "<AccountNumber>"+ cell.MSISND +
              "</AccountNumber>" + "<Name>" + cell.Name + "</Name>" + "<AccountType>" 
              + "MOBILE MONEY" + "</AccountType>" +  "</Beneficiary>"
              });
              let resultsPayload = xml.join("");
              this.service.bulkMobileMoneyTransactions(resultsPayload)
          .subscribe((data: any) => {
            if(data["AutoCreate"]["Response"][0]["Status"] == "OK"){
              this.service.isLoading = false;
              this.dialogRef.close();
              this.openSnackBar('Transaction successful','OK', 'success');
              return;
            }
            this.service.isLoading = false;
            this.openSnackBar(data["AutoCreate"]["Response"][0]["StatusMessage"],'OK', 'error');
          }, this.handleError.bind(this));
          
          
  }

  uploadSingleTransaction(transactionType: string): void{
    this.service.isLoading = true;
    const form = <SinglePayment>this.singlePaymentsGroup.getRawValue();
    let callCode = '256';
    let telephone = form.phoneNumber;
    let msnid = callCode + telephone;
    let amount: string = `${this.incrementWithTelcos(this.telco, form.amount)}`;
    let reason:string = "PAYMENT";
    this.service.actualAmount = `${form.amount}`;
    if(form.phoneNumber.startsWith('0') && form.phoneNumber.length == 10){
      msnid= telephone = callCode + telephone.substring(1,);
    }
    this.service.
    manualTransaction(amount,msnid, reason, transactionType)
    .subscribe((data: any) => {
      if(data["AutoCreate"]["Response"][0]["Status"] == "OK"){
        this.service.isLoading = false;
        this.dialogRef.close();
        this.openSnackBar('Transaction successful','OK', 'success');
        return;
      }
      this.service.isLoading = false;
      this.openSnackBar(data["message"],'OK', 'error');
    }, this.handleError.bind(this));

  }

  handleError(err: HttpErrorResponse){
    this.service.isLoading = false;
    if(err.error['message']){
      const message: string = err.error['message'];
      this.openSnackBar(message, 'OK', 'error');
      return;
    }else{
      this.openSnackBar('Oops something went wrong, check your network or contact support','OK', 'error');
    }
  }
  

  incrementWithTelcos(telco: string, total: string): number{
    if(parseInt(total) <= 600){
      if(telco == "MTN"){
        this.charge = "390";
        return parseInt(total) + 390;
      }else if(telco == "Airtel"){
        this.charge = "300";
        return parseInt(total) + 300;
      }else{
        this.charge = "390";
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
      panelClass: statusColor,
      
    });
  }

}
