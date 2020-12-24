import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HistoryReport } from 'src/app/models/models';

@Component({
  selector: 'app-loadingdialog',
  templateUrl: './loadingdialog.component.html',
  styleUrls: ['./loadingdialog.component.scss']
})
export class LoadingdialogComponent implements OnInit {
 transactionType = HistoryReport;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {transationType: string}) { }

  ngOnInit(): void {
  }

}
