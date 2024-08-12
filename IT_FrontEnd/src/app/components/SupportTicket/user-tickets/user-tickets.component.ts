import { Component } from '@angular/core';
import {SupportTicket} from "../../../model/SupportTicket/support-ticket";
import {SupportTicketService} from "../../../service/supportTicket/support-ticket.service";
import {CommonModule, NgFor, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-user-tickets',
  standalone: true,
  imports: [CommonModule , NgIf , NgFor , NgForOf ],
  templateUrl: './user-tickets.component.html',
  styleUrl: './user-tickets.component.scss'
})
export class UserTicketsComponent {
  tickets: SupportTicket[] = [];
  errorMessage: string = '';

  constructor(private supportTicketService: SupportTicketService) {}

  ngOnInit(): void {
    this.fetchUserTickets();
  }

  fetchUserTickets(): void {
    this.supportTicketService.getAllTicketsOfUser().subscribe(
      (data) => {
        this.tickets = data;
        console.log(data)
      },
      (error) => {
        this.errorMessage = 'An error occurred while fetching tickets.';
        console.error('Error fetching tickets:', error);
      }
    );
  }
}
