import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
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
  constructor(public service: MainService, public dialogRef: MatDialogRef<RepayloandialogComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    
    this.dialogRef.backdropClick().subscribe(() => {
      this.cancel();
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.cancel();
    });
    
  }

  cancel(): void{
    this.dialogRef.close();
    this.resetLoanDialog();
  }

  validateCustomer(): void{
    this.service.isLoading = true;
    this.service.userEnteredReferenceId = false;
    this.getBalanceRecords();
  }

  resetLoanDialog(): void{
    this.service.isLoading = false;
    this.service.userEnteredReferenceId = false;
  }

  payLoan(): void{
    this.service.isLoading = false;
  }

  getBalanceRecords(){
    this.firestore.doc('loanbalance/' + this.referenceId).get().subscribe((data) => {
      this.displayAmount = data.data()['Balance'];
      this.displayName = data.data()['Account_Name'];
    });
  }
}
