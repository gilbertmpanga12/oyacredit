import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-load-money-dialog',
  templateUrl: './load-money-dialog.component.html',
  styleUrls: ['./load-money-dialog.component.scss']
})
export class LoadMoneyDialogComponent implements OnInit {

  constructor(public service: MainService) { }

  ngOnInit(): void {
  }

  uploadFunds(): void{
    console.log('uploaded funds');
  }
}
