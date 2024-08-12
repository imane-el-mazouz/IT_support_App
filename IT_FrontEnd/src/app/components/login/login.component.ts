import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth_service/auth-service.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    const { email, password } = this.loginForm.value;

    if (this.loginForm.invalid) {
      return;
    }

    // this.http.post<{ accessToken: string, user: { role: string } }>('http://localhost:8081/api/auth/login', { email, password })
    this.http.post<{ accessToken: string, user: { role: string } }>('http://localhost:8080/api/auth/login', { email, password })
      .subscribe(
        response => {
          this.authService.setToken(response.accessToken);

          if (response.user.role === 'Admin') {
            this.router.navigate(['/dashboard']);
          } else if (response.user.role === 'UserU') {
            this.router.navigate(['/userU'])
          }else if (response.user.role === 'Technician'){
            this.router.navigate(['/technician'])
          } else {
            this.errorMessage = 'role undefined: ' + response.user.role;
          }
        },
        error => {
          console.error('Error during login', error);
          this.errorMessage = 'Login failed. Please check your credentials and try again.';
        }
      );
  }
}
