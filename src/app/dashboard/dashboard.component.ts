import { Component, OnInit } from '@angular/core';
import { Menu } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  howFiller: boolean = false;
  features: Menu[] = [
    {
      name: 'Home',
      icon: 'house'
    },
    {
      name: 'Airtime',
      icon: 'call'
    },
    {
      name: 'Mobile Money',
      icon: 'smartphone'
    },
    {
      name: 'Shop',
      icon: 'shopping_bag'
    }
  ];
  others: Menu[] = [
    {
      name: 'History',
      icon: 'history'
    },
    {
      name: 'Sign out',
      icon: 'login'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
