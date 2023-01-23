import { AuthService } from './auth.service';
import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private _userUrl = 'http://localhost:3000/api/users';

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  async register(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<any>(this._userUrl, user, {
          headers: this.authService.buildHeaders(),
        })
        .subscribe({
          next: (response: User) => {
            resolve(response);
          },
          error: (error) => {
            reject(error);
          },
        });
    });
  }

  async list(): Promise<Array<User>> {
    return new Promise((resolve, reject) => {
      this.httpClient.get<Array<User>>(this._userUrl).subscribe({
        next: (response: Array<User>) => {
          resolve(response);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }
  
  delete(id: String): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .delete<boolean>(`${this._userUrl}/${id}`, {
          headers: this.authService.buildHeaders(),
        })
        .subscribe({
          next: (response: boolean) => {
            resolve(response);
          },
          error: (error) => {
            reject(error);
          },
        });
    });
  }
}
