import { Component, OnInit } from '@angular/core';
// import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-test',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  transactionCount: AngularFirestoreDocument<any>;
  transactionCount$: Observable<any>;
  bulkSingleCount: AngularFirestoreDocument<any>;
  bulkSingleCount$: Observable<any>;
  fundsCollectedCount: AngularFirestoreDocument<any>;
  fundsCollectedCount$: Observable<any>;
  fundsAvailableCount: AngularFirestoreDocument<any>;
  fundsAvailableCount$: Observable<any>;
  
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
      this.bulkSingleCount$ = this.bulkSingleCount.valueChanges();
  
      this.fundsCollectedCount = this.firestore.doc('fundsCollectedCount/' + this.service.userId);
      this.fundsCollectedCount$ = this.fundsCollectedCount.valueChanges();
  
      this.fundsAvailableCount = this.firestore.doc('fundsAvailableCount/' + this.service.userId);
      this.fundsAvailableCount$ = this.fundsAvailableCount.valueChanges();
 }

    
}
