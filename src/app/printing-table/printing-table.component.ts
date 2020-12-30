import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-printing-table',
  templateUrl: './printing-table.component.html',
  styleUrls: ['./printing-table.component.scss']
})
export class PrintingTableComponent implements OnInit {
  url: string;
  constructor(private route: ActivatedRoute) { 
    
    this.route.params.subscribe(param => {
      this.url = param.url;
    });
  }

  ngOnInit(): void {
  }

}
