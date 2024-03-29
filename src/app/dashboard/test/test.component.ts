import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit{
  transactionCount: AngularFirestoreDocument<any>;
  transactionCount$: Observable<any>;
  bulkSingleCount: AngularFirestoreDocument<any>;
  bulkSingleCount$: Observable<any>;
  fundsCollectedCount: AngularFirestoreDocument<any>;
  fundsCollectedCount$: Observable<any>;
  fundsAvailable: any;
  /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Funds Disbursed', cols: 1, rows: 1 },
  //         { title: 'Transactions', cols: 1, rows: 1 },
  //         { title: 'Funds Collected', cols: 1, rows: 1 },
  //         { title: 'Funds Available', cols: 1, rows: 1}
  //       ];
  //     }

  //     return [
  //       { title: 'Funds Disbursed', cols: 1, rows: 1 },
  //       { title: 'Transactions', cols: 1, rows: 1 },
  //       { title: 'Funds Collected', cols: 1, rows: 1 },
  //       { title: 'Funds Available', cols: 1, rows: 1 }
  //     ];
  //   })
  // );

  constructor(private breakpointObserver: BreakpointObserver, 
    private firestore: AngularFirestore, public service: MainService) { }
  
    ngOnInit(): void {
      this.transactionCount = this.firestore.doc('transactionCount/' + this.service.userId);
      this.transactionCount$ = this.transactionCount.valueChanges();
  
      this.bulkSingleCount = this.firestore.doc('singleBulkTransactionCount/' + this.service.userId);
      this.bulkSingleCount$ = this.transactionCount.valueChanges();
  
      this.fundsCollectedCount = this.firestore.doc('fundsCollectedCount/' + this.service.userId);
      this.fundsCollectedCount$ = this.transactionCount.valueChanges();
  
      this.service.getFundsAvailable().subscribe((data: any) => {
        this.fundsAvailable = data["totalBalance"];
        console.log(this.fundsAvailable)
      }, error => {
        console.log(error);
      })
    }

    
}
