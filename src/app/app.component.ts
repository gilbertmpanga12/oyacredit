import { Component } from '@angular/core';
import { Menu } from './models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'oyacredit';
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
}
