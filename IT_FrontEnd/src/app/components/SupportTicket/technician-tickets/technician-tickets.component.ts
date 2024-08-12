import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupportTicket } from '../../../model/SupportTicket/support-ticket';
import { SupportTicketService } from '../../../service/supportTicket/support-ticket.service';
import { Status } from '../../../enums/status';
import { ActivatedRoute } from '@angular/router';
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-technician-tickets',
  templateUrl: './technician-tickets.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule
  ],
  styleUrls: ['./technician-tickets.component.scss']
})
export class TechnicianTicketsComponent implements OnInit {
  tickets: SupportTicket[] = [];
  errorMessage: string = '';
  updateStatusForm: FormGroup;
  technicianId: number | undefined;
  statusEnum = Object.values(Status);
  selectedTicketId: number | undefined;

  constructor(
    private supportTicketService: SupportTicketService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.updateStatusForm = this.fb.group({
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.technicianId = +params.get('technicianId')!;
      this.fetchTicketsByTechnicianId(this.technicianId);
    });
  }

  fetchTicketsByTechnicianId(technicianId: number | undefined): void {
    this.supportTicketService.getTicketsByTechnicianId(technicianId).subscribe({
      next: (tickets) => this.tickets = tickets,
      error: (error) => {
        this.errorMessage = 'An error occurred while fetching tickets';
        console.error('Error fetching tickets', error);
      }
    });
  }

  onSelectTicket(ticketId: number): void {
    this.selectedTicketId = ticketId;
  }

  onUpdateStatus(): void {
    if (this.updateStatusForm.valid && this.selectedTicketId) {
      const status = this.updateStatusForm.get('status')?.value;
      this.supportTicketService.updateTicketStatus(this.selectedTicketId, status).subscribe({
        next: (updatedTicket) => {
          this.fetchTicketsByTechnicianId(this.technicianId);
          this.updateStatusForm.reset();
          this.selectedTicketId = undefined;
          alert('Ticket status updated successfully');
        },
        error: (error) => {
          this.errorMessage = `An error occurred while updating the ticket status: ${error.message || 'Unknown error'}`;
          console.error('Error updating ticket status', error);
        }
      });
    }
  }
}
