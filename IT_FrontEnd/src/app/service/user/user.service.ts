import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserU } from '../../model/UserU/userU';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Technician} from "../../model/Technician/technician";
import {User} from "../../model/User/user";

@Injectable({
  providedIn: 'root'
})
export class UserUService {
  private apiUrl = 'http://localhost:8080/api/users';
  private usersSubject = new BehaviorSubject<UserU[]>([]);
  usersU$: Observable<UserU[]> = this.usersSubject.asObservable();

  private showSaveUserSubject = new BehaviorSubject<boolean>(false);
  private showSaveTechSubject = new BehaviorSubject<boolean>(false);
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


  getTechnicians(): Observable<Technician[]> {
    return this.http.get<Technician[]>(`${this.apiUrl}/technicians`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something went wrong, please try again later.'));
  }
  toggleSaveTechDisplay(show: boolean) {
    this.showSaveTechSubject.next(show);
  }

  updateUser(id: number | undefined, userDTO: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update/${id}`, userDTO, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}` , { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getUserById(userId: number | undefined): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}` ,  { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

}
