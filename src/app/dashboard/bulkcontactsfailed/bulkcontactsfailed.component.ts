import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MainService } from 'src/app/services/main.service';
import {FailedHistory} from '../../models/models';

@Component({
  selector: 'app-bulkcontactsfailed',
  templateUrl: './bulkcontactsfailed.component.html',
  styleUrls: ['./bulkcontactsfailed.component.scss']
})
export class BulkcontactsfailedComponent implements OnInit {
  displayedColumns: string[] = ['name','phoneNumber', 'amount', 'reason'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() bulkContacts: FailedHistory[];
  dataSource;
  constructor(public service: MainService) { }

  ngOnInit(): void {
   this.dataSource = new MatTableDataSource<FailedHistory>(this.service.bulkResults);
  }
  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }

  deleteContact(index: number): void{
    this.service.bulkTotal -= parseInt(this.service.bulkResults[index].amount);
    this.service.bulkResults.splice(index,1);
    this.service.actualAmount = `${this.service.bulkTotal}`;
    this.dataSource = new MatTableDataSource<FailedHistory>(this.service.bulkResults);
  }

  proceedWithBulkPayment(): void{
    this.service.bulkTransactionReady = true;
  }

  


}
