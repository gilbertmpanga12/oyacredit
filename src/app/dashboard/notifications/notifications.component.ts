import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { HistoryReport, Report, ReportCollections } from 'src/app/models/models';
import { MainService } from 'src/app/services/main.service';
import { LoadingdialogComponent } from 'src/app/shared/loadingdialog/loadingdialog.component';
import {SelectionModel} from '@angular/cdk/collections';
import { ConfirmbulkpaymentComponent } from 'src/app/shared/confirmbulkpayment/confirmbulkpayment/confirmbulkpayment.component';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent{
  displayedColumns: string[] = ['charge','transactionRef', 'amount',  
  'phoneNumber','transactionInitiationDate', 'transactionType', 'status'];
  dataSource: MatTableDataSource<History>;
  itemsCount:number = 0;
  showRefCodeSet: Set<string> = new Set();
  historyTransaction =  HistoryReport;
  @Input() shouldPrint: boolean = false;
  spinload: boolean = true;
  range: FormGroup;
  startDate: string;
  endDate: Date;
  reports = Report;
  reportCollectionType = ReportCollections;
  sortingOrder: any = 'desc';
  selection = new SelectionModel<History>(true, []);
  constructor(private firestore: AngularFirestore, public dialog: MatDialog, 
    private _fb: FormBuilder, private service: MainService, private _snackBar: MatSnackBar) {
   this.range = this._fb.group({
    start: '',
    end: ''
   });
   
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.getData();
  }
  
  shortenString(transactionRef: string): string {
    return transactionRef.substring(0,10);
  }

  addToSet(refCode: string): void{
    this.showRefCodeSet.add(refCode);
  }

  removeKeyFromSet(refCode: string): void{
    this.showRefCodeSet.delete(refCode);
  }

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  openConfirmDialog(): void{
    this.dialog.open(ConfirmbulkpaymentComponent, {
      width: '400px',
      height: 'auto',
      data: this.selection.selected
    });
  }

  // openDialogResu(): void{
  //   this.dialog.open(ConfirmbulkpaymentComponent, {
  //     width: '400px',
  //     height: 'auto',
  //     data: this.selection.selected
  //   });
  // }


  

  // addEventEnd(event: MatDatepickerInputEvent<Date>) {
  //   const endDate = this.range.get('end').value;
  //   if(endDate){
  //     const startDateTimeStamp = this.range.get('start').value;
  //     const endDateTimeStamp = this.range.get('end').value;
  //     this.openDialog(startDateTimeStamp, endDateTimeStamp);
  //       this.service.getReportsInRange(
  //         startDateTimeStamp, endDateTimeStamp).subscribe((data) => {
  //         this.service.hasGeneratedReport = true;
  //         this.service.reportUrl =  data['message'];
         
  //       }, (error) => {
  //         console.log(error);
  //         this.openSnackBar(error['message'],'OK');
  //         this.dialog.closeAll();
  //       }, () => {
  //         this.dialog.closeAll();
  //       });
  //   }
  // }

  transform(value: string, max: number, append = '...'): string {
    if(value.includes('BULK')){
      return `${value.slice(0, max)}${append}`;
    }
    return value;
}

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 5000,
    horizontalPosition: "right",
    verticalPosition: "top",
    panelClass: ["error"]
  });
}

resetOrder(order: string): void{
  this.sortingOrder = order;
  this.getData();
}

getData(){
  this.firestore.collection('transactions', ref => ref.where('status', '==', 'FAILED').orderBy('transactionInitiationDate', 
    this.sortingOrder)).valueChanges().subscribe((data: History[]) => {
      this.itemsCount = data.length;
      this.dataSource =  new MatTableDataSource<History>(data);
      this.dataSource.paginator = this.paginator;
     });
}

isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.itemsCount;
  return numSelected === numRows;
}


masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}


checkboxLabel(row?: History): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;// ${row.position + 1}
}

log(){
  console.log(this.selection.selected);
}
}
