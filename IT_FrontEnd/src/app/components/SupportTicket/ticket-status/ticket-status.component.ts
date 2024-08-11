import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {SupportTicketService} from "../../../service/supportTicket/support-ticket.service";

@Component({
  selector: 'app-ticket-status',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './ticket-status.component.html',
  styleUrl: './ticket-status.component.scss'
})
export class TicketStatusComponent implements OnInit{
  status: string | undefined;
  ticketId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private supportTicketService: SupportTicketService
  ) {}

  ngOnInit(): void {
    this.ticketId = Number(this.route.snapshot.paramMap.get('ticketId'));
    if (this.ticketId) {
      this.loadStatus();
    }
  }

  loadStatus(): void {
    this.supportTicketService.getTicketStatusById(this.ticketId).subscribe(
      status => this.status = status,
      error => console.error('Error loading status:', error)
    );
  }
}
