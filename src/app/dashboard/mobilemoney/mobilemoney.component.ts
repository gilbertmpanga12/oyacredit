import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MobilemoneydialogComponent} from '../mobilemoneydialog/mobilemoneydialog.component';
import {MobileMoney} from '../../models/models';

@Component({
  selector: 'app-mobilemoney',
  templateUrl: './mobilemoney.component.html',
  styleUrls: ['./mobilemoney.component.scss']
})
export class MobilemoneyComponent implements OnInit {
  operations = MobileMoney;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(operation: string): void{
    this.dialog.open(MobilemoneydialogComponent, {
      width: '250px',
      data: {}
    });
  }

}
