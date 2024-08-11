import {Component, OnInit} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {SupportTicket} from "../../../model/SupportTicket/support-ticket";
import {ActivatedRoute} from "@angular/router";
import {SupportTicketService} from "../../../service/supportTicket/support-ticket.service";

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [
    NgIf,
    DatePipe
  ],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss'
})
export class TicketDetailsComponent implements OnInit{
  ticket: SupportTicket | undefined;
  ticketId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private supportTicketService: SupportTicketService
  ) {}

  ngOnInit(): void {
    this.ticketId = Number(this.route.snapshot.paramMap.get('ticketId'));
    if (this.ticketId) {
      this.loadTicket();
    }
  }

  loadTicket(): void {
    this.supportTicketService.getTicketById(this.ticketId).subscribe(
      ticket => this.ticket = ticket,
      error => console.error('Error loading ticket:', error)
    );
  }
}


