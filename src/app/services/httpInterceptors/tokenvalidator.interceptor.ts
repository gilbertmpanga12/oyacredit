import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MainService } from '../main.service';


@Injectable()
export class TokenvalidatorInterceptor implements HttpInterceptor {

  constructor(private service: MainService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers = request.clone({headers: new HttpHeaders({
      'Authorization': `Bearer ${this.service.token}`,
      'Uid': this.service.userId
    })});
    return next.handle(headers).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        return true;
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        console.log(err.status)
        if (err.status === 403) {
          this.service.signOut();
          return false;
        }
      }
    }));
  }
}
