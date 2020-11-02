import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { environment } from 'src/environments/environment';
import { CSV, SingleTransaction } from '../models/models';

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

// manual transaction
  manualTransaction(amount:string, phoneNumber:string, narrative:string){
    return this.http.get(environment.baseUrl 
      + 'single-transaction' + '/api' + `/${amount}` + `/${phoneNumber}` + `/${narrative}`);
  }

  // withdraw from Yo! to mobile money account
  withdrawTransaction(amount:string, phoneNumber:string, narrative:string){
    return this.http.get(environment.baseUrl 
      + 'bulk-transactions' + '/withdraw' + `/${amount}` + `/${phoneNumber}` + `/${narrative}`);
  }

  bulkMobileMoneyTransactions(beneficiary: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Control-Allow-Origin": "*",
         beneficiary: beneficiary
      })
    };
    return this.http.get(environment.baseUrl + "bulk-transactions" + "/pay", httpOptions);

  }

  checkApprovals(){
    this.isLoading = true;
    return this.http.get(environment.baseUrl + 'balances' 
    + '/check-status');
  }

  

}
