import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserUService } from '../../../../service/user/user.service';
import { User } from '../../../../model/User/user';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterOutlet
  ],
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  userForm: FormGroup = this.fb.group({});
  userId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserUService,
    private fb: FormBuilder
  ) {

      this.userForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],

      });

  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null && !isNaN(+idParam)) {
      this.userId = +idParam;
      this.loadUser();
    } else {
      console.error('Error: Invalid UserID parameter');
    }
  }

  loadUser(): void {
    if (this.userId !== undefined) {
      this.userService.getUserById(this.userId).subscribe(
        (user: User) => {
          this.userForm = this.fb.group({
            name: [user.name, Validators.required],
            email: [user.email, [Validators.required, Validators.email]],
            password: [user.password, Validators.required],
          });
        },
        error => console.error('Error loading user:', error)
      );
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.updateUser(this.userId, this.userForm.value).subscribe(
        () => {
          console.log('User updated successfully');
          this.router.navigate(['/equipments']);
        },
        error => console.error('Error updating user:', error)
      );
    }
  }
}
