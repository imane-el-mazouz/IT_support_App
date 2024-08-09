import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {User} from "../../model/User/user";
import {UserService} from "../../service/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-save-user',
  standalone: true,
  imports: [ReactiveFormsModule , NgIf],
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.scss']
})
export class SaveUserComponent implements OnInit {
  saveForm: FormGroup;
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.saveForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Added email validator
      password: ['', [Validators.required, Validators.minLength(6)]] // Added minlength validator
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log('Users loaded: ', this.users);
      },
      error: (error) => {
        console.error('Error loading users', error);
      }
    });
  }

  onSubmit(): void {
    if (this.saveForm.valid) {
      let user: User = this.saveForm.value;
      this.userService.saveUser(user).subscribe({
        next: (response) => {
          console.log('User saved successfully', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error during saving user', error);
          this.router.navigate(['/home']);
        }
      });
    }
  }
}
