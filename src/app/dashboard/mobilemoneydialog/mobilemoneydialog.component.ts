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
  finalAmount: string = '0';
  constructor(public dialogRef: MatDialogRef<MobilemoneydialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,  private _single_fb: 
    FormBuilder, public service: MainService,  private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.singlePaymentsGroup = this._single_fb.group({
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
      amount: ['', [Validators.required, Validators.min(500)]],
      reason: ['', [Validators.required]]
    });

    this.singlePaymentsGroup.get('amount').valueChanges.subscribe((amount) => {
      this.finalAmount =  amount;
    });
  }

  getProcessingFee(amount: string): string {
    const computedtotal = `${parseInt(amount) - (4/100 * parseInt(amount))}`;
   return  `${parseInt(computedtotal)}`;
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

   generateRandomId(): string {
    const id = "" + Math.random() * 10000000000;
    return `E${parseInt(id)}@foo.com`;
  }

  sendBulkTransation(): void {
    this.service.isLoading = true;
    let xml = this.service.csvResults.map((cell: CSV) => {
      if(parseInt(cell.Amount) < 500){
        throw this.stopSendingBulk(`
        Your excel file includes an amount less than 500, 
        please update it to an amount not less than 500
        `,"Ok","error")
      }
      return "<Beneficiary>" + "<Amount>" + this.checkTelcoAndIncrement(cell.Amount,cell.MSISND) + "</Amount>"+ 
              "<AccountNumber>"+ cell.MSISND +
              "</AccountNumber>" + "<Name>" + cell.Name + "</Name>" + "<AccountType>" 
              + "MOBILE MONEY" + "</AccountType>" + "<EmailAddress>" + this.generateRandomId() +"</EmailAddress>" + "</Beneficiary>"
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
    let msnid = callCode + telephone;// , 
    let reason:string = "PAYMENT";
    this.service.actualAmount = this.finalAmount;
    if(form.phoneNumber.startsWith('0') && form.phoneNumber.length == 10){
      msnid= telephone = callCode + telephone.substring(1,);
    }
    let amount: string = `${this.checkTelcoAndIncrement(this.finalAmount, msnid)}`;
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
  

  // incrementWithTelcos(telco: string, total: string): number{
  //   if(parseInt(total) <= 600){
  //     if(telco == "MTN"){
  //       this.charge = "390";
  //       return parseInt(total) + 390;
  //     }else if(telco == "Airtel"){
  //       this.charge = "300";
  //       return parseInt(total) + 300;
  //     }else{
  //       this.charge = "390";
  //       return parseInt(total) + 390;
  //     }
  //   }else{
  //     return parseInt(total);
  //   }
  // }

  checkTelcoAndIncrement(total: string, phoneNumber: string): string{
    let default_amount :string = `${parseInt(total) + 390}`;
    switch(phoneNumber.substring(3,5)){
      case "78":
        default_amount = `${parseInt(total) + 390}`;
        break;
      case "77":
        default_amount = `${parseInt(total) + 390}`;
        break;
      case "75":
        default_amount = `${parseInt(total) + 300}`;
        break;
      case "70":
        default_amount = `${parseInt(total) + 300}`;
        break;
      default:
        default_amount =  `${parseInt(total) + 390}`;
    }
    return default_amount;
  }





  openSnackBar(message: string, action: string, statusColor:string) {
    this._snackBar.open(message, action, {
      duration: 9000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: statusColor,
      
    });
  }
  
  stopSendingBulk(message: string, action: string, statusColor:string): void{
    this.service.isLoading = false;
    this.openSnackBar(message, action, statusColor);
    this.checkBulkPayment();
  }

}
