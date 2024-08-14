import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Technician } from '../../model/Technician/technician';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {
  // private apiUrl = 'http://localhost:8080/api/ticket';
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getTechnicians(): Observable<Technician[]> {
    return this.http.get<Technician[]>(`${this.apiUrl}/technicians`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  saveTechnician(technician: Technician): Observable<Technician> {
    return this.http.post<Technician>(`${this.apiUrl}/addTechnician`, technician, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getTechnicianById(id: number): Observable<Technician> {
    return this.http.get<Technician>(`${this.apiUrl}/technician/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateTechnician(id: number | undefined, technician: Technician): Observable<Technician> {
    return this.http.put<Technician>(`${this.apiUrl}/updateTechnician/${id}`, technician, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteTechnician(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteTechnician/${id}`, {headers: this.getHeaders()})

  }


  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something went wrong, please try again later.'));
  }
}
