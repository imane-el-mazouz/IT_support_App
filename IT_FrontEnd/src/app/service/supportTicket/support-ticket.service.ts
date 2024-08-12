import { Injectable } from '@angular/core';
import {privateDecrypt} from "node:crypto";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SupportTicket} from "../../model/SupportTicket/support-ticket";
import {Observable, throwError} from "rxjs";
import {Status} from "../../enums/status";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SupportTicketService {

  // private apiUrl = 'http://localhost:8080/api/ticket';
  private apiUrl = 'http://localhost:8080/api/ticket';

  constructor(private http : HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  saveTicket(supportTicket: SupportTicket, breakdownId: number, equipmentId: number): Observable<SupportTicket> {
    return this.http.post<SupportTicket>(`${this.apiUrl}/${breakdownId}/${equipmentId}`, supportTicket, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }


  assignTicketToTechnician(ticketId: number, technicianId: number ): Observable<SupportTicket> {
    return this.http.put<SupportTicket>(`${this.apiUrl}/${ticketId}/assign/${technicianId}`,null, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));

  }



  getTicketById(ticketId: number | undefined): Observable<SupportTicket> {
    return this.http.get<SupportTicket>(`${this.apiUrl}/${ticketId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getAllTicketsOfUser(): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(`${this.apiUrl}/tickets`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }


  getTicketsByTechnicianId(technicianId: number | undefined): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(`${this.apiUrl}/technician/${technicianId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateTicketStatus(ticketId: number, status: Status): Observable<SupportTicket> {
    return this.http.put<SupportTicket>(`${this.apiUrl}/${ticketId}/status?status=${status}`, null ,{ headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getTicketStatusById(ticketId: number | undefined): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${ticketId}/status`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
  getAllTickets(): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(`${this.apiUrl}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something went wrong'));
  }

}
