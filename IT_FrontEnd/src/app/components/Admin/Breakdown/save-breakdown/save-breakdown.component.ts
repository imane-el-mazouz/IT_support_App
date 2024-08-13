import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {KeyValuePipe, NgForOf} from "@angular/common";
import {RepairStatus} from "../../../../enums/repair-status";
import {BreakdownService} from "../../../../service/breakdown/breakdown.service";
import {Breakdown} from "../../../../model/Breakdow/breakdown";

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
export class SaveBreakdownComponent implements OnInit{
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
        error => console.error('Error saving equipment:', error)
      );
    }
  }
}


