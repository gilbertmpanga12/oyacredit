// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AngularFireAuth } from '@angular/fire/auth';

// import { take, map, tap} from 'rxjs/operators';
// // CanActivate,
// @Injectable({
//   providedIn: 'root'
// })
// export class MainGuard implements  CanActivateChild {
//   // canActivate(
//   //   next: ActivatedRouteSnapshot,
//   //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//   //   return true;
//   // }
//   constructor(private auth: AngularFireAuth, private router: Router){}

//   canActivateChild(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return this.auth.authState
//     .pipe(take(1),map(user => {
//       return !!user;
//     }), tap(loggedIn => {
//       if (!loggedIn) {
//         this.router.navigate(['/auth']);
//       }
//   }));
    
//   }
  
// }
