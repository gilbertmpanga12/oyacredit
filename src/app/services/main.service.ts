import { HttpClient,HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
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
  csvResults: CSV[] = [];
  bulkTransactionReady: boolean = false;
  bulkTotal: number = 0;
  actualAmount: string = "";
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

// deleteContact(index: number): void{
//   this.csvResults.splice(index,1);
// }
// manual transaction
// withdraw from Yo! to mobile money account
  manualTransaction(amount:string, phoneNumber:string, narrative:string, transactionType: string){
    if(transactionType == 'ManualTransaction'){
      return this.http.get(environment.baseUrl 
        + 'single-transaction' + '/api' + `/${amount}` + `/${phoneNumber}` + `/${narrative}` + `/${this.actualAmount}`);
    }

    return this.http.get(environment.baseUrl 
      + 'bulk-transactions' + '/withdraw' + `/${amount}` + `/${phoneNumber}` + `/${narrative}` + `/${this.actualAmount}`);
   
  }


  bulkMobileMoneyTransactions(beneficiary: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Control-Allow-Origin": "*",
         beneficiary: JSON.stringify({xml: beneficiary,phoneNumbers:this.csvResults})
      })
    };
    // /pay/:amount/:actualAmount
    return this.http.get(environment.baseUrl + "bulk-transactions" + "/pay/" + `${this.bulkTotal}` + `/${this.actualAmount}`, httpOptions);

  }

  checkApprovals(){
    this.isLoading = true;
    return this.http.get(environment.baseUrl + 'balances' 
    + '/check-status');
  }

  async resetName(displayName: string){
    (await this.auth.currentUser).updateProfile({displayName});
  }
  
  async resetPassword(password: string){
    (await this.auth.currentUser).updatePassword(password);
  }

  async updatePhoto(photo: string){
    (await this.auth.currentUser).updateProfile({photoURL: photo});
  }

  get userId(): string{
    const user = JSON.parse(localStorage.getItem('user'));
    return user["uid"];
  }

    getFundsAvailable(){
      return this.http.get(environment.baseUrl + 'balances/' + 'get-balance');
  }
  
  resetToDefaults(): void{
    this.csvResults =  [];
    this.bulkTransactionReady = false;
    this.bulkTotal = 0;
  }
  

}
