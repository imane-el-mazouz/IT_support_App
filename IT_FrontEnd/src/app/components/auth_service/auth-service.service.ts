import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {Observable} from "rxjs";
import {User} from "../../model/user_model/user";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private userIdKey = 'userId';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  clearToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userIdKey);
    }
  }

  // getUserId(): number | null {
  //   const token = this.getToken();
  //   if (token) {
  //     try {
  //       const payload = JSON.parse(atob(token.split('.')[1]));
  //       return payload.userId ? Number(payload.userId) : null;
  //     } catch (error) {
  //       console.error('Error decoding token', error);
  //       return null;
  //     }
  //   }
  //   return null;
  // }
  // getUserId(): number | null {
  //   const token = this.getToken();
  //   if (token) {
  //     try {
  //       const payload = JSON.parse(atob(token.split('.')[1]));
  //       const isExpired = payload.exp && Date.now() >= payload.exp * 1000;
  //       if (isExpired) {
  //         this.clearToken();
  //         return null;
  //       }
  //       return payload.userId ? Number(payload.userId) : null;
  //     } catch (error) {
  //       console.error('Error decoding token', error);
  //       return null;
  //     }
  //   }
  //   return null;
  // }
  //
  //
  // setUserId(userId: number): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     localStorage.setItem(this.userIdKey, userId.toString());
  //   }
  // }
  //
  // getUsername(): string | null {
  //   const token = this.getToken();
  //   if (token) {
  //     try {
  //       const payload = JSON.parse(atob(token.split('.')[1]));
  //       return payload.username || null;
  //     } catch (error) {
  //       console.error('Error decoding token', error);
  //       return null;
  //     }
  //   }
  //   return null;
  // }
  //

}
