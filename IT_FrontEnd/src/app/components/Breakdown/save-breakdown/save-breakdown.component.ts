import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BreakdownService} from "../../../service/breakdown/breakdown.service";
import {Router} from "@angular/router";
import {RepairStatus} from "../../../enums/repair-status";
import {Breakdown} from "../../../model/Breakdow/breakdown";
import {KeyValuePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-save-breakdown',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    KeyValuePipe,
    NgForOf
  ],
  templateUrl: './save-breakdown.component.html',
  styleUrl: './save-breakdown.component.scss'
})
export class SaveBreakdownComponent {
  breakdownForm: FormGroup;
  repairStatuses = RepairStatus;



  constructor(
    private fb: FormBuilder,
    private breakdownService: BreakdownService,
    private router: Router
  ) {
    this.breakdownForm = this.fb.group({
      description: ['', [Validators.required]],
      reportedDate: ['', [Validators.required]],
      repairStatus: [RepairStatus.Pending, [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.breakdownForm.valid) {
      const breakdown: Breakdown = this.breakdownForm.value;
      this.breakdownService.saveBreakdowns(breakdown).subscribe(
        () => {
          this.router.navigate(['/list-breakdowns']);
        },
        error => console.error('Error saving breakdown:', error)
      );
    }
  }
}


