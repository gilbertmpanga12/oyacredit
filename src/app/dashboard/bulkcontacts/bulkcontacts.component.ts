import {AfterViewInit, Component, ViewChild, OnInit,Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CSV } from 'src/app/models/models';

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
  constructor() { }

  ngOnInit(): void {
    console.log(this.bulkContacts)
   this.dataSource = new MatTableDataSource<CSV>(this.bulkContacts);
  }
  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }

}
