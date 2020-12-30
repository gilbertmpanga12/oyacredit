import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-repayloandialog',
  templateUrl: './repayloandialog.component.html',
  styleUrls: ['./repayloandialog.component.scss']
})
export class RepayloandialogComponent implements OnInit {
  referenceId:string;
  amount: string;
  userBalances: AngularFirestoreDocument<any>;
  userBalance$: Observable<any>;
  displayAmount: string;
  displayName: string;
  loading: boolean = false;
  telephone: string;
  hasError: boolean = false;
  balance: number;
  constructor(public service: MainService, 
    public dialogRef: MatDialogRef<RepayloandialogComponent>, 
    private firestore: AngularFirestore, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
    this.dialogRef.backdropClick().subscribe(() => {
      this.cancel();
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.cancel();
    });
    
  }

  cancel(): void {
    this.service.userEnteredReferenceId = true;
    this.dialogRef.close();
    this.resetLoanDialog();
    window.location.reload();
  }


  validateCustomer(): void{
    this.service.isLoading = true;
    this.service.userEnteredReferenceId = false;
    this.service.checkReferenceID(this.referenceId).subscribe((data) => {
      if(data['message']){
        this.hasError = true;
      }
      this.displayAmount = data['Balance'];
      this.displayName = data['Account_Name'];
      this.balance= data['Balance'];

    }, error => {
      this.hasError = true;
      this.service.isLoading = false;
      alert('Account doesnt exist or an internal error occured ');
      this.cancel();
    });
  }

  resetLoanDialog(): void{
    this.service.isLoading = false;
    this.service.userEnteredReferenceId = false;
  }

  payLoan(): void {
    this.service.isLoading = false;
    this.service.actualAmount = this.amount;
    this.loading = true;
    let telephone = this.telephone;

    if(this.telephone.startsWith('0') && this.telephone.length == 10){
      telephone = telephone = '256' + telephone.substring(1,);
    }else {
      telephone = '256' + this.telephone;
    }

    // if(parseInt(this.amount) > this.balance){
    //   alert('Not sufficient amount to complete transaction');
    //   return ;
    // }

  this.service.
    manualTransaction(this.amount, telephone, 'Single transaction', 'ManualTransaction', this.referenceId)
    .subscribe((data: any) => {
      if(data["AutoCreate"]["Response"][0]["Status"] == "OK"){
        this.service.isLoading = false;
        this.dialogRef.close();
        this.openSnackBar('Transaction successful','OK', 'success');
        return;
      }
      this.service.isLoading = false;
      this.service.actualAmount = "";
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
  

  openSnackBar(message: string, action: string, statusColor:string) {
    this._snackBar.open(message, action, {
      duration: 9000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: statusColor,
      
    });
  }
  

  getBalanceRecords(){
    this.firestore.doc('loanbalance/' + this.referenceId).get().subscribe((data) => {
      this.displayAmount = data.data()['Balance'];
      this.displayName = data.data()['Account_Name'];
    });
  }
}
