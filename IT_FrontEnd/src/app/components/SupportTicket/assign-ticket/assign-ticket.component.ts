import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Technician} from "../../../model/Technician/technician";
import {UserUService} from "../../../service/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TechnicianService} from "../../../service/technician/technician.service";
import {SupportTicketService} from "../../../service/supportTicket/support-ticket.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-assign-ticket',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './assign-ticket.component.html',
  styleUrl: './assign-ticket.component.scss'
})
export class AssignTicketComponent implements OnInit{
  assignForm: FormGroup;
  technicians: Technician[] = [];
  ticketId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private supportTicketService: SupportTicketService,
    private technicianService: TechnicianService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.assignForm = this.fb.group({
      technicianId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.ticketId = Number(this.route.snapshot.paramMap.get('ticketId'));
    if (this.ticketId) {
      this.loadTechnicians();
    }
  }

  loadTechnicians(): void {
    this.technicianService.getTechnicians().subscribe(technicians => {
      this.technicians = technicians;
    });
  }

  onSubmit(): void {
    if (this.assignForm.valid && this.ticketId) {
      const technicianId = this.assignForm.get('technicianId')?.value;
      this.supportTicketService.assignTicketToTechnician(this.ticketId, technicianId).subscribe(
        () => this.router.navigate(['/list-tickets']),
        error => console.error('Error assigning ticket:', error)
      );
    }
  }
}
