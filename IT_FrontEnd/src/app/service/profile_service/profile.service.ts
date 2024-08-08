import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Person} from "../../model/Person/person";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8081/api/user';

  constructor(private http: HttpClient) {}


  getUserProfile(userId: number): Observable<Person> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<Person>(url, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching user profile:', error);
        return throwError(() => new Error('Error fetching user profile'));
      })
    );
  }



  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  updateUserProfile(userId: number | null, updatedProfile: Partial<Person>): Observable<Person> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put<Person>(url, updatedProfile, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating user profile:', error);
        return throwError(() => new Error('Error updating user profile'));
      })
    );
  }
}
