import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {User} from "../../../model/User/user";
import {UserUService} from "../../../service/user/user.service";
import {Router, RouterOutlet} from "@angular/router";
import {UserU} from "../../../model/UserU/userU";

@Component({
  selector: 'app-save-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterOutlet],
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.scss']
})
export class SaveUserComponent implements OnInit {
  saveForm: FormGroup;
  usersU: UserU[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserUService,
    private router: Router
  ) {
    this.saveForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (usersU) => {
        this.usersU = usersU;
        console.log('Users loaded: ', this.usersU);
      },
      error: (error) => {
        console.error('Error loading users', error);
      }
    });
  }

  onSubmit(): void {
    if (this.saveForm.valid) {
      let userU: UserU = this.saveForm.value;
      this.userService.saveUser(userU).subscribe({
        next: (response) => {
          console.log('UserU saved successfully', response);
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error during saving userU', error);
          this.router.navigate(['/home']);
        }
      });
    }
  }
}
