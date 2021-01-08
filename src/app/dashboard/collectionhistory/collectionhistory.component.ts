import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { MainService } from 'src/app/services/main.service';
import { HistoryReport, LoanCollectionHistory, Report, ReportCollections} from '../../models/models';
import { LoadingdialogComponent } from '../../shared/loadingdialog/loadingdialog.component';

@Component({
  selector: 'app-collectionhistory',
  templateUrl: './collectionhistory.component.html',
  styleUrls: ['./collectionhistory.component.scss']
})
export class CollectionhistoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['amount', 'customerReferenceId', 'msisdn', 'date_time', 'network_ref'];
  dataSource: MatTableDataSource<LoanCollectionHistory>;
  itemsCount:number = 0;
  showRefCodeSet: Set<string> = new Set();
  historyTransaction =  HistoryReport;
  @Input() shouldPrint: boolean = false;
  spinload: boolean = true;
  reports = Report;
  reportCollectionType = ReportCollections;
  constructor(private firestore: AngularFirestore, public dialog: MatDialog, 
    private service: MainService, private _snackBar: MatSnackBar) {
   
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.firestore.collection('loancollection_logs', ref => ref.orderBy('date_time','desc')).valueChanges().subscribe((data: LoanCollectionHistory[]) => {
    this.itemsCount = data.length;
    this.dataSource =  new MatTableDataSource<LoanCollectionHistory>(data);
    this.dataSource.paginator = this.paginator;
    if(this.shouldPrint && this.itemsCount){
      this.spinload = false;
      setTimeout(() => {
        window.print();
      }, 3000);
    }
  });

  
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
          '', '', typeofReport, this.reportCollectionType.Collections).subscribe((data) => {
          this.service.hasGeneratedReport = true;
          this.service.reportUrl =  data['message'];
         
        }, (error) => {
          console.log(error);
          this.openSnackBar(error['message'],'OK');
          this.dialog.closeAll();
        }, () => {
          // this.dialog.closeAll();
        });
    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ["error"]
    });
  }

}
