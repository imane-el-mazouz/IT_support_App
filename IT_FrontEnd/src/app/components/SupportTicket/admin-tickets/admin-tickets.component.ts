import { Component } from '@angular/core';
import {SupportTicket} from "../../../model/SupportTicket/support-ticket";
import {SupportTicketService} from "../../../service/supportTicket/support-ticket.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-admin-tickets',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './admin-tickets.component.html',
  styleUrl: './admin-tickets.component.scss'
})
export class AdminTicketsComponent {
  tickets: SupportTicket[] = [];
  errorMessage: string = '';

  constructor(private supportTicketService: SupportTicketService) { }

  ngOnInit(): void {
    this.fetchAllTickets();
  }

  fetchAllTickets(): void {
    this.supportTicketService.getAllTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
      },
      error: (error) => {
        this.errorMessage = 'An error occurred while fetching tickets';
        console.error('Error fetching tickets', error);
      }
    });
  }
}
