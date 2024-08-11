import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Equipment } from "../../model/Equipment/equipment";
import { catchError } from "rxjs/operators";
import {Breakdown} from "../../model/Breakdow/breakdown";

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  // private apiUrl = 'http://localhost:8080/api/equipment';
  private apiUrl = 'http://localhost:8081/api/equipment';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.apiUrl}`, { headers: this.getHeaders() })

  .pipe(catchError(this.handleError));
  }

  saveEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(`${this.apiUrl}`, equipment, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getEquipmentById(id: number | undefined): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateEquipment(id: number | undefined, equipment: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(`${this.apiUrl}/${id}`, equipment, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteEquipment(id: number): Observable<void> {
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
