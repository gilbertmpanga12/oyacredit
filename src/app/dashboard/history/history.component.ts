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
import { SelectionModel } from '@angular/cdk/collections';



@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['charge', 'transactionRef', 'amount', 
  'phoneNumber','transactionInitiationDate', 'transactionType', 'status'];
  dataSource: MatTableDataSource<History>;
  itemsCount:number = 0;
  showRefCodeSet: Set<string> = new Set();
  historyTransaction =  HistoryReport;
  @Input() shouldPrint: boolean = false;
  spinload: boolean = true;
  range: FormGroup;
  startDate: number;
  endDate: number
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
  //     // this.openDialog(startDateTimeStamp, endDateTimeStamp);
  //     //   this.service.getReportsInRange(
  //     //     startDateTimeStamp, endDateTimeStamp).subscribe((data) => {
  //     //     this.service.hasGeneratedReport = true;
  //     //     this.service.reportUrl =  data['message'];
         
  //     //   }, (error) => {
  //     //     console.log(error);
  //     //     this.openSnackBar(error['message'],'OK');
  //     //     this.dialog.closeAll();
  //     //   }, () => {
  //     //     this.dialog.closeAll();
  //     //   });
  //   }
  // }

  addEventStart(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value.getTime();
  }

  addEventEnd(event: MatDatepickerInputEvent<Date>) {
    try{
      this.endDate = event.value.getTime();
      if(this.endDate && this.startDate){
        console.log('called range');
        this.getDataDateRange(this.startDate, this.endDate);
      }
    }catch(e){
      return false;
    }
  }


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

resetPage(){
  this.startDate = null;
  this.endDate = null;
  this.selection.clear();
}

getData(){
  this.firestore.collection('transactions', ref => ref.orderBy('transactionInitiationDate', 
    this.sortingOrder)).valueChanges().subscribe((data: History[]) => {
      this.itemsCount = data.length;
      this.dataSource =  new MatTableDataSource<History>(data);
      this.dataSource.paginator = this.paginator;
     });
     //this.firestore.collection('transactions', ref => ref.where('transactionRef','==', '49786015652')).get().subscribe(data => data.forEach(x => console.log(x.id)));
}

getDataDateRange(startDate: number, endDate: number){
  this.firestore.collection('transactions', ref => 
  ref.where('transactionInitiationDate','>=',startDate).where('transactionInitiationDate','<=', endDate).orderBy('transactionInitiationDate', 
    this.sortingOrder)).valueChanges().subscribe((data: History[]) => {
      this.itemsCount = data.length;
      console.log(this.itemsCount);
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



}


