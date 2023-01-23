import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _registerUrl = 'http://localhost:3000/api/register';

  constructor(private httpClient: HttpClient) {}

  registerUser(user: User) {
    return this.httpClient.post<any>(this._registerUrl, user);
  }
}
