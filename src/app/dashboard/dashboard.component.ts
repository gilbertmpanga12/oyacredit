import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../models/models';
import { MainService } from '../services/main.service';

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
      icon: 'house',
      url: '/'
    },
    {
      name: 'Airtime',
      icon: 'call',
      url: '/airtime'
    },
    {
      name: 'Mobile Data',
      icon: 'signal_cellular_4_bar',
      url: '/mobile-data'
    },
    {
      name: 'Mobile Money',
      icon: 'smartphone',
      url: '/mobile-money'
    },
    {
      name: 'Banks',
      icon: 'credit_card',
      url: '/banks'
    }
  ];

  constructor(private router: Router, public service: MainService) { }

  ngOnInit(): void {
  }

  navigate(url: string): void{
    this.router.navigate(['/' + url]);
  }
}
