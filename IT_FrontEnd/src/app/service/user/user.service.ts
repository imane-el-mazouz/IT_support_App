// import { Injectable } from '@angular/core';
// import {HttpClient, HttpHeaders} from "@angular/common/http";
// import {User} from "../../model/User/user";
// import {Observable, throwError} from "rxjs";
// import {catchError} from "rxjs/operators";
// import { BehaviorSubject } from 'rxjs';
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   // private apiUrl = 'http://localhost:8080/api/users';
//   private apiUrl = 'http://localhost:8081/api/users';
//   private usersSubject = new BehaviorSubject<User[]>([]);
//   users$: Observable<User[]> = this.usersSubject.asObservable();
//
//
//   constructor( private http : HttpClient) { }
//
//   private getHeaders() : HttpHeaders {
//     const token = localStorage.getItem('token');
//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     });
//   }
//
//   saveUser(user : User): Observable<User> {
//     return this.http.post<User>(`${this.apiUrl}/addUserU` , user , {headers: this.getHeaders()})
//       .pipe(catchError(this.handleError));
//   }
//
//   getUsers(): Observable<User[]> {
//     return this.http.get<User[]>(`${this.apiUrl}/all`, { headers: this.getHeaders() })
//       .pipe(catchError(this.handleError));
//   }
//
//   private handleError(error : any): Observable<never> {
//     console.error('An error occured ' , error);
//     return throwError(() => new Error('Something went wrong, please try again later.'));
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../model/User/user';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8081/api/users';
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.usersSubject.asObservable();

  private showSaveUserSubject = new BehaviorSubject<boolean>(false);
  showSaveUser$ = this.showSaveUserSubject.asObservable();

  constructor(private http: HttpClient) { }


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/addUserU`, user, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }



  toggleSaveUserDisplay(show: boolean) {
    this.showSaveUserSubject.next(show);
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something went wrong, please try again later.'));
  }
}
