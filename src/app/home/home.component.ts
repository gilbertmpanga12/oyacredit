import { Component, OnInit } from '@angular/core';

export interface Section {
  name: string;
  updated: Date;
  icon: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  showFiller: boolean = false;
  folders: Section[] = [
    {
      name: 'Home',
      updated: new Date('1/1/16'),
      icon: 'house'
    },
    {
      name: 'Airtime',
      updated: new Date('1/17/16'),
      icon: 'call'
    },
    {
      name: 'Mobile Money',
      updated: new Date('1/28/16'),
      icon: 'smartphone'
    },
    {
      name: 'Shop',
      updated: new Date('1/28/16'),
      icon: 'shopping_bag'
    }
  ];
  notes: Section[] = [
    {
      name: 'Sign out',
      updated: new Date('1/18/16'),
      icon: 'login'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
