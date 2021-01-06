import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MainService } from './services/main.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private service: MainService){
    router.events.pipe(filter(events => events instanceof NavigationEnd)).subscribe(events => {
        this.service.refreshToken();
    })
  }
  
}
