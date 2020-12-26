import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { HistoryReport, LoanCollectionHistory} from '../../models/models';
import { LoadingdialogComponent } from '../loadingdialog/loadingdialog.component';

@Component({
  selector: 'app-collectionhistory',
  templateUrl: './collectionhistory.component.html',
  styleUrls: ['./collectionhistory.component.scss']
})
export class CollectionhistoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['AMOUNT', 'CUSTOMERREFERENCEID', 'MSISDN', 'ISSUED_AT'];
  dataSource: MatTableDataSource<LoanCollectionHistory>;
  itemsCount:number = 0;
  showRefCodeSet: Set<string> = new Set();
  historyTransaction =  HistoryReport;
  constructor(private firestore: AngularFirestore, public dialog: MatDialog) {
   
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.firestore.collection('loancollectionhistory').valueChanges().subscribe((data: LoanCollectionHistory[]) => {
    this.itemsCount = data.length;
    this.dataSource =  new MatTableDataSource<LoanCollectionHistory>(data);
    this.dataSource.paginator = this.paginator;
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

  openDialog(transationType: string): void{
    this.dialog.open(LoadingdialogComponent, {
      width: '400px',
      height: 'auto',
      data: {transationType}
    });
  }

}
