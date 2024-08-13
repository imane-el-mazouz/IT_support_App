import {Component, OnInit} from '@angular/core';
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {User} from "../../../../model/User/user";
import {UserU} from "../../../../model/UserU/userU";
import {UserUService} from "../../../../service/user/user.service";

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    CommonModule
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




}
