import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  isAdmin = false;
  user: User;
  
  constructor(private authService: AuthService, 
    public activeModal: NgbActiveModal,
    private userService: UserService) {
      this.user = new User();
  }
  
  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  async saveUser(){
    this.userService.register(this.user).then((ret: User) => {
      console.log(ret);
      this.activeModal.close();
    });
  }
}
