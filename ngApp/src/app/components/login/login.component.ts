import { UserRegisterComponent } from './../user-register/user-register.component';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginUserData = new User();
  isAdminSubscription: Subscription;
  loggedInSubscription: Subscription;
  loggedIn = false;

  constructor(private authService: AuthService, private router: Router,    private modalService: NgbModal) {
    this.loggedInSubscription = this.authService.loggedInObservable.subscribe({
      next: (loggedIn) => {
        this.loggedIn = loggedIn;
      }
    })
    this.isAdminSubscription = this.authService.isAdminObservable.subscribe({
      next: (isAdmin) => {
        if (!isAdmin && this.loggedIn) this.router.navigate(['/cart']);
        else this.router.navigate(['/products']);
      },
    });
  }

  loginUser() {
    this.authService.loginUser(this.loginUserData);
  }

  newUser(){
    const modalRef = this.modalService.open(UserRegisterComponent, {backdrop: false});
    modalRef.componentInstance.name = 'Bolinho';
  }
}
