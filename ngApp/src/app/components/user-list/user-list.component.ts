import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRegisterComponent } from '../user-register/user-register.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users = new Array<User>();

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {
    this.listUsers();
  }

  async listUsers() {
    this.users = await this.userService.list();
  }

  async removeUser(id: String) {
    this.userService.delete(id).then((_) => {
      this.userService.list().then((users) => {
        this.users = users;
      });
    });
  }

  async newUser() {
    const modalRef = this.modalService.open(UserRegisterComponent, {
      backdrop: true,
    });

    modalRef.closed.subscribe({
      next: (_) => {
        this.userService.list().then((users) => {
          this.users = users;
        });
      },
    });
  }
}
