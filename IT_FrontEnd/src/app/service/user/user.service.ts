import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../model/User/user";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';


  constructor( private http : HttpClient) { }

  private getHeaders() : HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  saveUser(user : User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/addUserU` , user , {headers: this.getHeaders()})
      .pipe(catchError(this.handleError));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error : any): Observable<never> {
    console.error('An error occured ' , error);
    return throwError(() => new Error('Something went wrong, please try again later.'));
  }
}
