import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  hide = true;
  title = 'hello-world';
  loading = false;
  constructor() { }

  ngOnInit(): void {
  }

  save(): void {
    this.loading = true;
  }

}
