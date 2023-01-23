import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  isAdminSubscription: Subscription;
  isAdmin = false;
  
  constructor(private authService: AuthService, private router: Router) {
    this.isAdminSubscription = authService.isAdminObservable.subscribe({
      next: (isAdmin) => {
        this.isAdmin = isAdmin;
      }
    })
  }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
