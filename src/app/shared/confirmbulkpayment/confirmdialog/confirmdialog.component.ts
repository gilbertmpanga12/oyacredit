import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FailedHistory } from 'src/app/models/models';
import { MainService } from 'src/app/services/main.service';


@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrls: ['./confirmdialog.component.scss']
})
export class ConfirmdialogComponent implements OnInit {

  constructor(public service: MainService, public dialogRef: MatDialogRef<ConfirmdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FailedHistory[], private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  deleteTransactions(): void{
    this.service.isLoading = true;
    this.service.deleteSelectedBulkPayments(this.data).subscribe(data => {
      this.service.isLoading = false;
      this.dialogRef.close();
      this.openSnackBar('Successfully deleted selected bulk payments', 'OK', 'success');
    }, err => {
      this.service.isLoading = false;
      this.openSnackBar('Something went wrong while deleting', 'Try again', 'error');
    });
  }

  openSnackBar(message: string, action: string, statusColor:string) {
    this._snackBar.open(message, action, {
      duration: 9000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: statusColor,
      
    });
  }
  
}
