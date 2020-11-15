import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {LoadMoneyDialogComponent} from '../load-money-dialog/load-money-dialog.component';

@Component({
  selector: 'app-load-money',
  templateUrl: './load-money.component.html',
  styleUrls: ['./load-money.component.scss']
})
export class LoadMoneyComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void{
    this.dialog.open(LoadMoneyDialogComponent, {
      width: '400px',
      height: 'auto'
    });
  }

}
