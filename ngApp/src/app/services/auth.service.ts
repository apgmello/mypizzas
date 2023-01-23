import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginData } from '../models/login-data';
import jwt_decode from "jwt-decode";

@Injectable()
export class AuthService {

  private _loginUrl = 'http://localhost:3000/api/login';

  loggedInSource = new Subject<boolean>();
  loggedInObservable = this.loggedInSource.asObservable();
  isAdminSource = new Subject<boolean>();
  isAdminObservable = this.isAdminSource.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {}

  loginUser(user: User) {
    return this.httpClient.post<any>(this._loginUrl, user).subscribe({
      next:(ret: LoginData)=>{
        localStorage.setItem('token', ret.token);
        this.loggedInSource.next(true);
        this.publishIsAdmin();
        return true;
      },
      error: () => {
        this.loggedInSource.next(false);
        return false;
      }
    });
  }

  logoutUser() {
    localStorage.clear();
    this.loggedInSource.next(false);
    this.isAdminSource.next(false);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return localStorage.getItem('token') != null;
  }

  publishIsAdmin() {
    var token = localStorage.getItem('token');
    if(token) {
      var decoded = jwt_decode(token) as LoginData;
      this.isAdminSource.next(decoded.admin);  
    }
  }

  isAdmin() : boolean {
    var isAdmin = false;
    var token = localStorage.getItem('token');
    if(token) {
      var decoded = jwt_decode(token) as LoginData;
      isAdmin = decoded.admin;
    }
    return isAdmin;
  }

  buildHeaders = () =>
    new HttpHeaders().set('Authorization',  `bearer ${localStorage.getItem('token') ?? ''}` );

}
