import {Component, OnInit} from '@angular/core';
import {SupportTicket} from "../../../model/SupportTicket/support-ticket";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {SupportTicketService} from "../../../service/supportTicket/support-ticket.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-tickets-by-technician',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf
  ],
  templateUrl: './tickets-by-technician.component.html',
  styleUrl: './tickets-by-technician.component.scss'
})
export class TicketsByTechnicianComponent implements OnInit{
  tickets: SupportTicket[] = [];
  technicianId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private supportTicketService: SupportTicketService
  ) {}

  ngOnInit(): void {
    this.technicianId = Number(this.route.snapshot.paramMap.get('technicianId'));
    if (this.technicianId) {
      this.loadTickets();
    }
  }

  loadTickets(): void {
    this.supportTicketService.getTicketsByTechnicianId(this.technicianId).subscribe(
      tickets => this.tickets = tickets,
      error => console.error('Error loading tickets:', error)
    );
  }
}
