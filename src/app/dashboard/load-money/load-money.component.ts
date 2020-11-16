import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MainService } from 'src/app/services/main.service';
import {LoadMoneyDialogComponent} from '../load-money-dialog/load-money-dialog.component';

@Component({
  selector: 'app-load-money',
  templateUrl: './load-money.component.html',
  styleUrls: ['./load-money.component.scss']
})
export class LoadMoneyComponent implements OnInit {
  fundsAvailableCount: AngularFirestoreDocument<any>;
  fundsAvailableCount$: Observable<any>;
  constructor(public dialog: MatDialog,private firestore: AngularFirestore, public service:MainService) { }

  ngOnInit(): void {
    this.fundsAvailableCount = this.firestore.doc('fundsAvailableCount/' + this.service.userId);
    this.fundsAvailableCount$ = this.fundsAvailableCount.valueChanges();
  }

  openDialog(): void{
    this.dialog.open(LoadMoneyDialogComponent, {
      width: '400px',
      height: 'auto'
    });
  }

  

}