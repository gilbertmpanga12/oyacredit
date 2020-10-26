import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
// import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  // user:  User;
  isLoading: boolean = false;
  

  constructor(private router: Router) {
    // this.auth.authState.subscribe(user => {
    //   if (user){
    //     this.user = user;
    //     localStorage.setItem('user', JSON.stringify(this.user));
    //   } else {
    //     localStorage.setItem('user', null);
    //   }
    // });
   }

   async login(email: string, password: string) {
    this.isLoading = true;
    // let result = await this.auth.signInWithEmailAndPassword(email,password);
    // this.router.navigate(['/']);
    this.isLoading = false;
  }

}
