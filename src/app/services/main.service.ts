import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { environment } from 'src/environments/environment';
import { SingleTransaction } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  user:  User;
  isLoading: boolean = false;
  

  constructor(private router: Router, private auth: AngularFireAuth, private http: HttpClient) {
    this.auth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
   }

   async login(email: string, password: string) {
    this.isLoading = true;
    await this.auth.signInWithEmailAndPassword(email,password);
  }

  async signOut(){
    await this.auth.signOut();
    this.router.navigate(['/auth']);
  }

   singleMobileMoneyTransaction(amount:string, phoneNumber:string, narrative:string){
    this.isLoading = true;
    return this.http.get<SingleTransaction>(environment.baseUrl 
      + 'single-transaction' + '/api' + `/${amount}` + `/${phoneNumber}` + `/${narrative}`);
  }

  bulkMobileMoneyTransactiosn(){
    this.isLoading = true;
  }

  checkApprovals(){
    this.isLoading = true;
    return this.http.get(environment.baseUrl + 'balances' + '/check-status');
  }

  

}
