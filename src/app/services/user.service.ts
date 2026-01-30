import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertService } from './alert.service';
import { Router, RouterModule } from '@angular/router';
import { CreateUserModel, CreateUserModelIam, UserModel } from '../models/userlogin.model';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private refreshAuthSubject = new Subject<void>();

  // API_USER:string = 'http://localhost:8081/login';
  API_USER = environment.url_apiUser;
  API_CREATE_USER = environment.base_url_apiBack+'/userAccount/create';
  API_CREATE_USER_IAM = environment.base_url_apiIam+'/createuser';
  API_GET_GENRESMOVIE = environment.base_url_apiBack+'/genre/movie/all';
  API_GET_GENRESTV = environment.base_url_apiBack+'/genre/tv/all';
  API_GET_STREAMING = environment.base_url_apiBack+'/streaming/all';

  constructor(
    private http:HttpClient,
    private alertSvc:AlertService,
    private router:Router,
  ) { }

  get refreshAuth$() {
    
    return this.refreshAuthSubject.asObservable();
  }
  triggerAuthRefresh() {
    
    this.refreshAuthSubject.next();
  }

  getGenresMovie () {
    return this.http.get(this.API_GET_GENRESMOVIE);
  }
  getGenresTv () {
    return this.http.get(this.API_GET_GENRESTV);
  }
  getStreaming () {
    return this.http.get(this.API_GET_STREAMING);
  }
  
  postCreateUserToApi (createUser:CreateUserModel) {
    return this.http.post(this.API_CREATE_USER, createUser);
  }

  postCreateUserIamToApi (createUserIam:CreateUserModelIam) {
    return this.http.post(this.API_CREATE_USER_IAM, createUserIam);
  }
  
  login(credentials:UserModel) {
    let userData = {
      email : credentials.email, 
      passwordHash: credentials.password
    };
    return this.http.post(this.API_USER, userData);
  }

  logout() {
    
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.alertSvc.showAlert('Vous êtes déconnecté(e)');
    this.triggerAuthRefresh();
    // this.router.navigate(['/']);
  }

  isAuth():boolean {
    let token = localStorage.getItem('token')
    if(token!=null && token.length>100 ) {
      return true;
    }
    return false;
  }



}
