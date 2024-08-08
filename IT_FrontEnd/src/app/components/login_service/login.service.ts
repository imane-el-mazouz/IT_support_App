import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth_service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginComponent {
  constructor(private authService: AuthService, private http: HttpClient) { }

  login(username: string, password: string): void {
    this.http.post<{ token: string }>('http://localhost:8081/api/auth/login', { username, password })
      .subscribe(response => {
        this.authService.setToken(response.token);
      });
  }
}
