import {Component, OnInit} from '@angular/core';
import {SupportTicket} from "../../../model/SupportTicket/support-ticket";
import {SupportTicketService} from "../../../service/supportTicket/support-ticket.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-list-ticket',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './list-ticket.component.html',
  styleUrl: './list-ticket.component.scss'
})
export class ListTicketComponent implements OnInit {
  tickets: SupportTicket[] = [];

  constructor(private ticketService: SupportTicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getAllTickets().subscribe(
      (data: SupportTicket[]) => {
        this.tickets = data;
      },
      error => {
        console.error('Error loading tickets:', error);
      }
    );
  }
}
