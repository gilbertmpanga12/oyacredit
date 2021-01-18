import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FailedHistory } from 'src/app/models/models';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-confirmbulkpayment',
  templateUrl: './confirmbulkpayment.component.html',
  styleUrls: ['./confirmbulkpayment.component.scss']
})
export class ConfirmbulkpaymentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmbulkpaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FailedHistory[], public service: MainService,  private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  checkBulkPayment(): void{
    this.service.bulkTransactionReady = false;
  }

  sendBulkTransation(): void {
    this.service.isLoading = true;
    let xml = this.data.map((cell: FailedHistory) => {
      if(parseInt(cell.amount) < 500){
        throw this.stopSendingBulk(`
        Your excel file includes an amount less than 500, 
        please update it to an amount not less than 500
        `,"Ok","error")
      }
      return "<Beneficiary>" + "<Amount>" + this.service.checkTelcoAndIncrement(cell.amount,cell.phoneNumber) + "</Amount>"+ 
              "<AccountNumber>"+ cell.phoneNumber +
              "</AccountNumber>" + "<Name>" + cell.name + "</Name>" + "<AccountType>" 
              + "MOBILE MONEY" + "</AccountType>" + "<EmailAddress>" + this.service.generateRandomId() +"</EmailAddress>" + "</Beneficiary>"
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

  stopSendingBulk(message: string, action: string, statusColor:string): void{
    this.service.isLoading = false;
    this.openSnackBar(message, action, statusColor);
    this.checkBulkPayment();
  }

  openSnackBar(message: string, action: string, statusColor:string) {
    this._snackBar.open(message, action, {
      duration: 9000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: statusColor,
      
    });
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
  

}
