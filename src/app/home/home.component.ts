import { Component, OnInit } from '@angular/core';
import {Menu} from '../models/models';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  showFiller: boolean = false;
  folders: Menu[] = [
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
  notes: Menu[] = [
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
