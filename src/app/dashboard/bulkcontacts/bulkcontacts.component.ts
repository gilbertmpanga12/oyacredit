import {AfterViewInit, Component, ViewChild, OnInit,Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CSV } from 'src/app/models/models';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-bulkcontacts',
  templateUrl: './bulkcontacts.component.html',
  styleUrls: ['./bulkcontacts.component.scss']
})
export class BulkcontactsComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'MSISND', 'Amount', 'Reason', 'Controls'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() bulkContacts: CSV[];
  dataSource;
  constructor(public service: MainService) { }

  ngOnInit(): void {
   this.dataSource = new MatTableDataSource<CSV>(this.service.csvResults);
  }
  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }

  deleteContact(index: number): void{
    this.service.bulkTotal -= parseInt(this.service.csvResults[index].Amount);
    this.service.csvResults.splice(index,1);
    this.service.actualAmount = `${this.service.bulkTotal}`;
    this.dataSource = new MatTableDataSource<CSV>(this.service.csvResults);
  }

  proceedWithBulkPayment(): void{
    this.service.bulkTransactionReady = true;
  }

  

 

}
