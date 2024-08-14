import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Equipment} from "../../model/Equipment/equipment";
import {catchError} from "rxjs/operators";
import {Breakdown} from "../../model/Breakdow/breakdown";

@Injectable({
  providedIn: 'root'
})
export class BreakdownService {


  // private apiUrl = 'http://localhost:8080/api/breakdowns';
  private apiUrl = 'http://localhost:8080/api/breakdowns';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }


  saveBreakdowns(breakdown: Breakdown): Observable<Breakdown> {
    return this.http.post<Breakdown>(`${this.apiUrl}`, breakdown, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getBreakdownById(id: number | undefined): Observable<Breakdown> {
    return this.http.get<Breakdown>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }



  getBreakdowns(): Observable<Breakdown[]> {
    return this.http.get<Breakdown[]>(`${this.apiUrl}/breakdowns`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateBreakdown(id: number | undefined, breakdown: Breakdown): Observable<Breakdown> {
    return this.http.put<Breakdown>(`${this.apiUrl}/${id}` ,breakdown, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteBreakdown(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }


  getBreakdownsByEquipmentId(equipmentId: number): Observable<Breakdown[]> {
    return this.http.get<Breakdown[]>(`${this.apiUrl}/equipment/${equipmentId}/breakdowns`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }


  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something went wrong'));
  }
}

