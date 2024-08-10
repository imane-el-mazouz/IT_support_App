import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserU } from '../../model/UserU/userU';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserUService {
  private apiUrl = 'http://localhost:8081/api/users';
  private usersSubject = new BehaviorSubject<UserU[]>([]);
  usersU$: Observable<UserU[]> = this.usersSubject.asObservable();

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

  saveUser(userU: UserU): Observable<UserU> {
    return this.http.post<UserU>(`${this.apiUrl}/addUserU`, userU, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getUsers(): Observable<UserU[]> {
    return this.http.get<UserU[]>(`${this.apiUrl}/all`, { headers: this.getHeaders() })
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
