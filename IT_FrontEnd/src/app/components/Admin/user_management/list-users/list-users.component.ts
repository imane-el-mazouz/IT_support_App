import {Component, OnInit} from '@angular/core';
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {User} from "../../../../model/User/user";
import {UserU} from "../../../../model/UserU/userU";
import {UserUService} from "../../../../service/user/user.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    CommonModule,
    RouterLink
  ],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent implements OnInit{
  usersU : UserU[] = [];
  constructor(private userService : UserUService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => this.usersU = data,
      error => console.error('Error during fetching users ' , error)
    );
  }


  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          console.log('User deleted successfully');
          this.usersU = this.usersU.filter(b => b.id !== userId);

        },
        error => console.error('Error deleting user:', error));
    }
  }
}
