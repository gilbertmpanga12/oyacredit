import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {History, HistoryReport, Report, ReportCollections} from '../../models/models';
import { LoadingdialogComponent } from '../../shared/loadingdialog/loadingdialog.component';
import { MainService } from 'src/app/services/main.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['transactionRef', 'amount', 'charge', 
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

  openDialog(startDate:string, endDate:string, transactionType: string): void{
    this.dialog.open(LoadingdialogComponent, {
      width: '400px',
      height: 'auto',
      data: {startDate: startDate, endDate: endDate, transactionType: transactionType}
    });
  }

  getReport(typeofReport:string) {
    this.openDialog('', '', typeofReport);
        this.service.getReportsInRange(
          '', '', typeofReport, this.reportCollectionType.Disbursements).subscribe((data) => {
          this.service.hasGeneratedReport = true;
          this.service.reportUrl =  data['pdfUrl'];
          this.service.csvUrl = data['csvUrl'];
         
        }, (error) => {
          console.log(error);
          this.openSnackBar(error['message'],'OK');
          this.dialog.closeAll();
        }, () => {
          // this.dialog.closeAll();
        });
    
  }

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
  this.firestore.collection('transactions', ref => ref.orderBy('transactionInitiationDate', 
    this.sortingOrder)).valueChanges().subscribe((data: History[]) => {
      this.itemsCount = data.length;
      this.dataSource =  new MatTableDataSource<History>(data);
      this.dataSource.paginator = this.paginator;
     });
}



}


