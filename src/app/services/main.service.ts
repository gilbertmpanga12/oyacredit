import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { User } from 'firebase';
import { environment } from 'src/environments/environment';
import { CSV, FailedHistory } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  userEnteredReferenceId: boolean = true;
  user:  User;
  isLoading: boolean = false;
  csvResults: CSV[] = [];
  bulkResults: FailedHistory[] = [];
  bulkTransactionReady: boolean = false;
  bulkTotal: number = 0;
  actualAmount: string = "";
  token: string;
  hasGeneratedReport: boolean = false;
  reportUrl: string;
  csvUrl: string;
  constructor(private router: Router, private auth: AngularFireAuth, private http: HttpClient, private firestore: AngularFirestore) {
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
  manualTransaction(amount:string, phoneNumber:string, narrative:string, transactionType: string, referenceId=""){
    // /api/:amount/:phoneNumber/:narrative/:actualAmount
    if(transactionType == 'ManualTransaction'){
      return this.http.post(environment.baseUrl 
        + 'single-transaction/api/manual-loans' , {
          amount, phoneNumber, narrative, transactionType, referenceId
        });
    }

    return this.http.get(environment.baseUrl 
      + 'bulk-transactions' + '/withdraw' + `/${amount}` + `/${phoneNumber}` + `/${narrative}` + `/${this.actualAmount}`);
  }
  /*
  curl -v --insecure  -H "CLIENT_ACCESS_APIKEY: 63DC7C1C-C969-4439-A725-561FD8152B5D" -H  "API_CLIENT: TEST" 
  -d "TYPE=SYNC_BILLPAY_REQUEST" -d "TXNID=83753391505" 
  -d "MSISDN=255678218678" -d "AMOUNT=5000" -d "COMPANYNAME=25565555888" -d "CUSTOMERREFERENCEID=101001"  
  https://api.test.provisocloud.com:200/provisio/api/v1000/_transactions/_momopost/mp-500/repayments
  */

  // test(){
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'CLIENT_ACCESS_APIKEY':  '63DC7C1C-C969-4439-A725-561FD8152B5D',
  //       "API_CLIENT": "TEST"
  //     })
  //   };
  //   const url:string = 'https://api.test.provisocloud.com:200/provisio/api/v1000/_transactions/_momopost/mp-500/repayments';
  //   this.http.post(url, {
  //     "TYPE": "SYNC_BILLPAY_REQUEST",
  //     "TXNID":"83753391505",
  //     "MSISDN":"255678218678",
  //     "AMOUNT":"5000",
  //     "COMPANYNAME":"25565555888",
  //     "CUSTOMERREFERENCEID":"101001",
  //   },httpOptions).subscribe(data => {
  //     console.log(data);
  //   }, err => {
  //     console.log(err);
  //   })
  // }

   checkReferenceID(id){
    return this.http.get(`https://oyamicrocredit.mpayments.online/single-transaction/api/validate-customer/${id}`);
   }

   


  // bulkMobileMoneyTransactions(beneficiary: string){
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       "Control-Allow-Origin": "*",
  //        beneficiary: JSON.stringify({xml: beneficiary,phoneNumbers:this.csvResults})
  //     })
  //   };
  //   // /pay/:amount/:actualAmount
  //   return this.http.get(environment.baseUrl + "bulk-transactions" + "/pay/" + `${this.bulkTotal}` + `/${this.actualAmount}`, httpOptions);

  // }


  bulkMobileMoneyTransactions(beneficiary: string){
    // /pay/:amount/:actualAmount
    return this.http.post(environment.baseUrl + "bulk-transactions" + "/pay-bulk-payment", {
      xml: beneficiary, phoneNumbers: this.csvResults, bulkTotal: this.bulkTotal,
      actualAmount: this.actualAmount, reason: 'Oya Bulk Payments', from: 'OyaMicroCredit'
    });

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

  async refreshToken(){
    const user = (await this.auth.currentUser).getIdToken(true);
    const token = await user;
    if(token){
        this.token = token;
        this.checkToken(token);
    }
  }

  checkToken(token:string){
    this.http.get(environment.baseUrl + 'refresh-token').subscribe(resp => null, err => null);
  }

  getReportsInRange(startDate: string, endDate:string, typeofReport:string, collectionType: string){
    return this.http.post(environment.baseUrl + 'reports/api/monthly-report', {startDate, endDate, typeofReport, collectionType});// environment.baseUrl
  }


  checkTelcoAndIncrement(total: string, phoneNumber: string): string{
    let default_amount :string = `${parseInt(total) + 390}`;
    switch(phoneNumber.substring(3,5)){
      case "78":
        default_amount = `${parseInt(total) + 390}`;
        break;
      case "77":
        default_amount = `${parseInt(total) + 390}`;
        break;
      case "75":
        default_amount = `${parseInt(total) + 300}`;
        break;
      case "70":
        default_amount = `${parseInt(total) + 300}`;
        break;
      default:
        default_amount =  `${parseInt(total) + 390}`;
    }
    return default_amount;
  }

  generateRandomId(): string {
    const id = "" + Math.random() * 10000000000;
    return `E${parseInt(id)}@foo.com`;
  }




}
