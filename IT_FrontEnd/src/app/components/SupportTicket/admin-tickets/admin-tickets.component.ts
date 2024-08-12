import {Component, OnInit} from '@angular/core';
import {SupportTicket} from "../../../model/SupportTicket/support-ticket";
import {SupportTicketService} from "../../../service/supportTicket/support-ticket.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TechnicianService} from "../../../service/technician/technician.service";
import {Technician} from "../../../model/Technician/technician";
import {UserUService} from "../../../service/user/user.service";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-admin-tickets',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './admin-tickets.component.html',
  styleUrl: './admin-tickets.component.scss'
})
export class AdminTicketsComponent implements OnInit{
  tickets: SupportTicket[] = [];
  technicians: Technician[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  assignForm: FormGroup;
  showAssignForm: boolean = false;
  selectedTicketId: number | null = null;

  constructor(
    private supportTicketService: SupportTicketService,
    private technicianService: TechnicianService,
    private userService: UserUService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.assignForm = this.fb.group({
      technicianId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchAllTickets();
    this.loadTechnicians();
  }

  fetchAllTickets(): void {
    this.supportTicketService.getAllTickets().subscribe({
      next: (tickets) => this.tickets = tickets,
      error: (error) => {
        this.errorMessage = 'An error occurred while fetching tickets';
        console.error('Error fetching tickets', error);
      }
    });
  }

  loadTechnicians(): void {
    this.userService.getTechnicians().subscribe({
      next: (technicians) => this.technicians = technicians,
      error: (error) => {
        this.errorMessage = 'An error occurred while fetching technicians';
        console.error('Error fetching technicians', error);
      }
    });
  }

  onAssignButtonClick(ticketId: number): void {
    this.selectedTicketId = ticketId;
    this.showAssignForm = true;
  }

  onSubmit(): void {
    if (this.assignForm.valid && this.selectedTicketId !== null) {
      const technicianId = this.assignForm.get('technicianId')?.value;
      this.supportTicketService.assignTicketToTechnician(this.selectedTicketId, technicianId).subscribe({
        next: () => {
          this.fetchAllTickets();
          this.assignForm.reset();
          this.snackBar.open('Technician assigned successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.showAssignForm = false;
          this.selectedTicketId = null;
        },
        error: (error) => {
          this.errorMessage = `An error occurred while assigning the technician: ${error.message || 'Unknown error'}`;
          console.error('Error assigning technician', error);
        }
      });
    }
  }

  onCancel(): void {
    this.showAssignForm = false;
    this.selectedTicketId = null;
  }
}
