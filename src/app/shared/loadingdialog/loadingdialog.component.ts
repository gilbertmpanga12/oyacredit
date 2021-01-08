import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HistoryReport, Report } from 'src/app/models/models';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-loadingdialog',
  templateUrl: './loadingdialog.component.html',
  styleUrls: ['./loadingdialog.component.scss']
})
export class LoadingdialogComponent implements OnInit {
 transactionType = HistoryReport;
 reports = Report;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {startDate: string, endDate: string, transactionType: string}, public service: MainService) { }

  ngOnInit(): void {
  }

}
