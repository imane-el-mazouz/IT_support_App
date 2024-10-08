import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth_service/auth-service.service';
import {Role} from "../../enums/role";

@Injectable({
  providedIn: 'root'
})
export class LoginComponent {
  constructor(private authService: AuthService, private http: HttpClient) { }

  login(email: string, password: string): void {
    this.http.post<{ token: string, role: Role }>('http://localhost:8080/api/auth/login', { email, password })
      .subscribe(response => {
        this.authService.setToken(response.token);
        this.authService.setUserRole(response.role);
      });
  }
}
