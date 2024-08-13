import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from "@angular/common";
import {RepairStatus} from "../../../../enums/repair-status";
import {BreakdownService} from "../../../../service/breakdown/breakdown.service";
@Component({
  selector: 'app-update-breakdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-breakdown.component.html',
  styleUrls: ['./update-breakdown.component.scss']
})
export class UpdateBreakdownComponent implements OnInit {
  updateForm: FormGroup;
  breakdownId: number | undefined;
  repairStatuses: string[] = Object.values(RepairStatus);
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private breakdownService: BreakdownService,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      description: ['', Validators.required],
      reportedDate: ['', Validators.required],
      repairStatus: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.breakdownId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.breakdownId) {
      this.loadBreakdown();
    }
  }

  loadBreakdown(): void {
    this.breakdownService.getBreakdownById(this.breakdownId).subscribe(
      breakdown => {
        this.updateForm.patchValue(breakdown);
      },
      error => {
        this.errorMessage = 'Error loading breakdown data. Please try again later.';
        console.error('Error loading breakdown:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.updateForm.valid && this.breakdownId) {
      this.breakdownService.updateBreakdown(this.breakdownId, this.updateForm.value).subscribe(
        () => {
          this.router.navigate(['/list-breakdowns']);
        },
        error => {
          this.errorMessage = 'Error updating breakdown. Please try again later.';
          console.error('Error updating breakdown:', error);
        }
      );
    }
  }
}
