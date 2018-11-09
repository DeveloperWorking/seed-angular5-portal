import { Injectable, Injector} from '@angular/core';
import { HttpErrorResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginService } from './login.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HandleErrorService {

    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  
    constructor(private injector: Injector) { }
  
    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
      return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
    }
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
      const loginService = this.injector.get(LoginService);
  
      let token = loginService.getCurrentUser() ? loginService.getCurrentUser().access_token : null;
      return next.handle(this.addToken(req, token)).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>error).status) {
              case 400:

                if(error.error && error.error.error === 'invalid_grant') return Observable.throw(error);

                this.changeRota("/logout");
                break;
              case 401:
                this.changeRota("/logout");
                break;
              case 404:                
                this.changeRota('/home');
                // this.changeRota('/error-page');
                break;
              default:
                return Observable.throw(error);
            }
          } else {
            return Observable.throw(error);
          }
        }));
    }
  
    changeRota(rota) {
      const router = this.injector.get(Router);
  
      router.navigate([rota]);
    }
  }