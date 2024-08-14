import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from "@angular/common";
import { UserU } from "../../../../model/UserU/userU";
import { UserUService } from "../../../../service/user/user.service";
import { RouterLink, Router } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { User } from "../../../../model/User/user";

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  usersU: UserU[] = [];
  selectedUserId: number | null = null;
  userForm: FormGroup = this.fb.group({});

  constructor(
    private userService: UserUService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => this.usersU = data,
      error => console.error('Error during fetching users', error)
    );
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          console.log('User deleted successfully');
          this.usersU = this.usersU.filter(b => b.id !== userId);
        },
        error => console.error('Error deleting user:', error)
      );
    }
  }

  editUser(userId: number): void {
    this.selectedUserId = userId;
    this.loadUser(userId);
  }

  loadUser(userId: number): void {
    this.userService.getUserById(userId).subscribe(
      (userU: User) => {
        this.userForm = this.fb.group({
          name: [userU.name, Validators.required],
          email: [userU.email, [Validators.required, Validators.email]],
          password: [userU.password, Validators.required],
        });
      },
      error => console.error('Error loading user:', error)
    );
  }

  onSubmit(): void {
    if (this.userForm.valid && this.selectedUserId !== null) {
      this.userService.updateUser(this.selectedUserId, this.userForm.value).subscribe(
        () => {
          console.log('User updated successfully');
          this.selectedUserId = null;
          this.userService.getUsers().subscribe(data => this.usersU = data);
        },
        error => console.error('Error updating user:', error)
      );
    }
  }

  cancelEdit(): void {
    this.selectedUserId = null;
  }
}
