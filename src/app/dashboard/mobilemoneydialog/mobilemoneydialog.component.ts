import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MobileMoney} from '../../models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mobilemoneydialog',
  templateUrl: './mobilemoneydialog.component.html',
  styleUrls: ['./mobilemoneydialog.component.scss']
})
export class MobilemoneydialogComponent implements OnInit {
  operations = MobileMoney;
  singlePaymentsGroup: FormGroup;
  bulkPaymentsGroup: FormGroup;
  constructor(public dialogRef: MatDialogRef<MobilemoneydialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,  private _single_fb: FormBuilder, private _bulk_fb: FormBuilder) { }

  ngOnInit(): void {
    this.singlePaymentsGroup = this._single_fb.group({
      phoneNumber: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      reason: ['', [Validators.required]]
    });
    this.bulkPaymentsGroup = this._bulk_fb.group({
      phoneNumber: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      reason: ['', [Validators.required]]
    });
  }

}
