import {Component, OnInit} from '@angular/core';
import {SupportTicketService} from "../../../service/supportTicket/support-ticket.service";
import {BreakdownService} from "../../../service/breakdown/breakdown.service";
import {EquipmentService} from "../../../service/equipment/equipment.service";
import {Router} from "@angular/router";
import {Breakdown} from "../../../model/Breakdow/breakdown";
import {Equipment} from "../../../model/Equipment/equipment";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Status} from "../../../enums/status";

@Component({
  selector: 'app-save-ticket',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './save-ticket.component.html',
  styleUrl: './save-ticket.component.scss'
})
export class SaveTicketComponent implements OnInit{
  addTicketForm: FormGroup;
  breakdowns: Breakdown[] = [];
  equipments: Equipment[] = [];
  statusOptions = Object.values(Status);




  constructor(
    private fb: FormBuilder,
    private supportTicketService: SupportTicketService,
    private breakdownService: BreakdownService,
    private equipmentService : EquipmentService,
    private router: Router
  ) {
    this.addTicketForm = this.fb.group({
      description: ['', Validators.required],
      createdDate: ['', Validators.required],
      ticketStatus: ['', Validators.required],
      breakdownId: ['', Validators.required],
      equipmentId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadBreakdowns();
    this.loadEquipments();

  }

  loadBreakdowns(): void {
    this.breakdownService.getBreakdowns().subscribe(breakdowns => {
      this.breakdowns = breakdowns;
    });
  }
  loadEquipments(): void {
    this.equipmentService.getEquipments().subscribe(equipments => {
      this.equipments = equipments;
    });
  }


  onSubmit(): void {
    if (this.addTicketForm.valid) {
      const formValue = this.addTicketForm.value;
      this.supportTicketService.saveTicket(formValue, formValue.breakdownId, formValue.equipmentId).subscribe(
        () => this.router.navigate(['/list-tickets']),
        error => {
          console.error('Error adding ticket:', error);
        }
      );
    }
  }

}
