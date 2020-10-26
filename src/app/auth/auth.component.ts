import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MainService} from '../services/main.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  hide = true;
  loading = false;
  loginGroup: FormGroup;
  constructor(private _fb: FormBuilder, private service: MainService) { }

  ngOnInit(): void {
    this.loginGroup = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.loading = true;
    const payload: {email:string,password:string} = <{email:string,password:string}>this.loginGroup.getRawValue();
    this.service.login(payload.email,payload.password);
  }

}
