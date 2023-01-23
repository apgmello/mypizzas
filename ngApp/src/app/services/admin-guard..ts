import { Subscription } from 'rxjs';
import {  CanActivate } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  canActivate(): boolean {
    return this.authService.isAdmin();
  }
}
