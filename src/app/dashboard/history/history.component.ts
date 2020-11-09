import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import {History} from '../../models/models';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['transactionRef', 'amount', 'transactionInitiationDate', 'transactionType'];
  dataSource;
  itemsCount:number = 0;
  constructor(private firestore: AngularFirestore) {
    this.firestore.collection('transactions').valueChanges().subscribe((data: History[]) => {
      this.itemsCount = data.length;
     this.dataSource =  new MatTableDataSource<History>(data);
  });
    
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  

}

