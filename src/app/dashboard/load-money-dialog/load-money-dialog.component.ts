import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-load-money-dialog',
  templateUrl: './load-money-dialog.component.html',
  styleUrls: ['./load-money-dialog.component.scss']
})
export class LoadMoneyDialogComponent implements OnInit {
 amount: string;
  constructor(public service: MainService, private firestore: AngularFirestore,private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<LoadMoneyDialogComponent>) { }

  ngOnInit(): void {
  }

 async uploadFunds(){
    try{
    this.service.isLoading = true;
    const increment = firebase.firestore.FieldValue.increment(parseInt(this.amount));
    this.firestore.doc('fundsCollectedCount/' + this.service.userId).update({fundsCollectedCount:increment});
    this.openSnackBar('Great! amount successfully added','Ok','success');
    this.service.isLoading = false;
    this.dialogRef.close();
    }catch(e){
      this.service.isLoading = false;
      this.openSnackBar(e.message,'Ok','error');
    }
  }

  openSnackBar(message: string, action: string,status: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: status
    });
  }
}
