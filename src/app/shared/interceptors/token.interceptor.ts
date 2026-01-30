import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { isEmpty, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  cloneRequest!:HttpRequest<unknown>;

  API_CREATE_USER = environment.base_url_apiBack+'/userAccount/create';
  API_CREATE_USER_IAM = environment.base_url_apiIam+'/createuser';
  API_GET_GENRESMOVIE = environment.base_url_apiBack+'/genre/movie/all';
  API_GET_GENRESTV = environment.base_url_apiBack+'/genre/tv/all';
  API_GET_STREAMING = environment.base_url_apiBack+'/streaming/all';
  API_LOGIN_USER = environment.url_apiUser;

  constructor() {}

  // Retourne vrai si l'API a besoin d'un token
  IsPrivateApi(request: HttpRequest<unknown>): boolean {
    
    if( request.url.includes(this.API_CREATE_USER) || 
        request.url.includes(this.API_CREATE_USER_IAM) ||
        request.url.includes(this.API_GET_GENRESMOVIE) ||
        request.url.includes(this.API_GET_GENRESTV) ||
        request.url.includes(this.API_GET_STREAMING) ||
        request.url.includes(this.API_LOGIN_USER)
    ) {
      return false;
    }
    else {
      return true;
    }

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    let token = localStorage.getItem('token');
    
    if( this.IsPrivateApi(request) ) {
        if(request.method == 'POST' || request.method == 'GET' || request.method == 'DELETE') {
          // console.log("==== Interceptor TOKEN ====")
          this.cloneRequest = request
          .clone({headers: request.headers.set('authorization', 'Bearer '+token)})
        } else {
          this.cloneRequest = request;
        }
    }
    else {
      this.cloneRequest = request;  
    }

    return next.handle(this.cloneRequest);
  }
}