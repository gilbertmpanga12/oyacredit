import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Menu } from '../models/models';
import { MainService } from '../services/main.service';
import { trigger, transition, style, animate } from '@angular/animations';
import {EditprofileComponent} from './editprofile/editprofile.component';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

// animations
const slideInAnimation = trigger('routeAnimations', [ 
  transition('* <=> HomePage', [
    style({ opacity: 0 }), 
    animate(300, style({opacity: 1})),
  ]),
  transition('* <=> AirtimePage', [
    style({ opacity: 0 }), 
    animate(300, style({opacity: 1})),
  ]),
  transition('* <=> MobileDataPage', [
    style({ opacity: 0 }), 
    animate(300, style({opacity: 1})),
  ]),
  transition('* <=> MobileMoneyPage', [
    style({ opacity: 0 }), 
    animate(300, style({opacity: 1})),
  ]),
  transition('* <=> BanksPage', [
    style({ opacity: 0 }), 
    animate(300, style({opacity: 1})),
  ]),
  transition('* <=> HistoryPage', [
    style({ opacity: 0 }), 
    animate(300, style({opacity: 1})),
  ]),
  transition('* <=> CollectionHistoryPage', [
    style({ opacity: 0 }), 
    animate(300, style({opacity: 1})),
  ]),
  transition('* <=> NotificationsPage', [
    style({ opacity: 0 }), 
    animate(300, style({opacity: 1})),
  ])
  
]);

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [slideInAnimation]
})

export class DashboardComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  howFiller: boolean = false;
  features: Menu[] = [
    {
      name: 'Home',
      icon: 'house',
      url: '/'
    },
    // {
    //   name: 'Airtime',
    //   icon: 'call',
    //   url: '/airtime'
    // },
    // {
    //   name: 'Mobile Data',
    //   icon: 'signal_cellular_4_bar',
    //   url: '/mobile-data'
    // },
    {
      name: 'Mobile Money',
      icon: 'smartphone',
      url: '/mobile-money'
    }
    // {
    //   name: 'Banks',
    //   icon: 'credit_card',
    //   url: '/banks'
    // }
  ];

  constructor(private router: Router, public service: MainService, private dialog: MatDialog, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }

  navigate(url: string): void{
    this.router.navigate(['/' + url]);
  }
  
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  openDialog(): void {
    this.dialog.open(EditprofileComponent, {
      width: '410px',
      height: 'auto'
    });
  }

  checkCurrentRoute(route: string): boolean{
    return this.router.url === route;
  }
}
