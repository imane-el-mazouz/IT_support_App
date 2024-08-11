import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {SupportTicketService} from "../../../service/supportTicket/support-ticket.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Status} from "../../../enums/status";

@Component({
  selector: 'app-update-ticket',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './update-ticket.component.html',
  styleUrl: './update-ticket.component.scss'
})
export class UpdateTicketComponent implements OnInit{
  statusForm: FormGroup;
  ticketId: number | undefined;
  statuses = Object.keys(Status).map(key => ({ key, value: Status[key as keyof typeof Status] }));

  constructor(
    private fb: FormBuilder,
    private supportTicketService: SupportTicketService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.statusForm = this.fb.group({
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.ticketId = Number(this.route.snapshot.paramMap.get('ticketId'));
  }

  onSubmit(): void {
    if (this.statusForm.valid && this.ticketId) {
      const status = this.statusForm.get('status')?.value;
      this.supportTicketService.updateTicketStatus(this.ticketId, status).subscribe(
        () => this.router.navigate(['/ticket-details', this.ticketId]),
        error => console.error('Error updating status:', error)
      );
    }
  }
}
