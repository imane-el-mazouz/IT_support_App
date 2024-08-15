// import { Component, OnInit } from '@angular/core';
// import {Router, RouterLink} from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { NgForOf } from '@angular/common';
// import {Breakdown} from "../../../../model/Breakdow/breakdown";
// import {BreakdownService} from "../../../../service/breakdown/breakdown.service";
// import {ReactiveFormsModule} from "@angular/forms";
//
// @Component({
//   selector: 'app-list-breakdown',
//   standalone: true,
//     imports: [CommonModule, NgForOf, RouterLink, ReactiveFormsModule],
//   templateUrl: './list-breakdown.component.html',
//   styleUrls: ['./list-breakdown.component.scss']
// })
// export class ListBreakdownComponent implements OnInit {
//   breakdowns: Breakdown[] = [];
//
//   constructor(
//     private breakdownService: BreakdownService,
//     private router: Router
//   ) {}
//
//   ngOnInit(): void {
//     this.loadBreakdowns();
//   }
//
//   loadBreakdowns(): void {
//     this.breakdownService.getBreakdowns()
//       .subscribe(
//         (data: Breakdown[]) => this.breakdowns = data,
//         error => console.error('Error fetching breakdowns:', error)
//       );
//   }
//
//   deleteBreakdown(id: number): void {
//     if (confirm('Are you sure you want to delete this breakdown?')) {
//       this.breakdownService.deleteBreakdown(id).subscribe(
//         () => {
//           this.breakdowns = this.breakdowns.filter(b => b.id !== id);
//         },
//         error => console.error('Error deleting breakdown:', error)
//       );
//     }
//   }
//
//   updateBreakdown(id: number): void {
//     this.router.navigate([`/update-breakdown/${id}`]);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgForOf } from '@angular/common';
import { Breakdown } from "../../../../model/Breakdow/breakdown";
import { BreakdownService } from "../../../../service/breakdown/breakdown.service";
import {RepairStatus} from "../../../../enums/repair-status";

@Component({
  selector: 'app-list-breakdown',
  standalone: true,
  imports: [CommonModule, NgForOf, RouterLink, ReactiveFormsModule],
  templateUrl: './list-breakdown.component.html',
  styleUrls: ['./list-breakdown.component.scss']
})
export class ListBreakdownComponent implements OnInit {
  breakdowns: Breakdown[] = [];
  updateForm: FormGroup;
  selectedBreakdownId: number | null = null;
  repairStatuses: string[] = Object.values(RepairStatus);
  errorMessage: string | null = null;

  constructor(
    private breakdownService: BreakdownService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.updateForm = this.fb.group({
      description: ['', Validators.required],
      reportedDate: ['', Validators.required],
      repairStatus: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadBreakdowns();
  }

  loadBreakdowns(): void {
    this.breakdownService.getBreakdowns().subscribe(
      (data: Breakdown[]) => this.breakdowns = data,
      error => console.error('Error fetching breakdowns:', error)
    );
  }

  deleteBreakdown(id: number): void {
    if (confirm('Are you sure you want to delete this breakdown?')) {
      this.breakdownService.deleteBreakdown(id).subscribe(
        () => {
          this.breakdowns = this.breakdowns.filter(b => b.id !== id);
        },
        error => console.error('Error deleting breakdown:', error)
      );
    }
  }

  updateBreakdown(id: number): void {
    this.selectedBreakdownId = id;
    this.loadBreakdown();
  }

  loadBreakdown(): void {
    if (this.selectedBreakdownId) {
      this.breakdownService.getBreakdownById(this.selectedBreakdownId).subscribe(
        breakdown => {
          this.updateForm.patchValue(breakdown);
        },
        error => {
          this.errorMessage = 'Error loading breakdown data. Please try again later.';
          console.error('Error loading breakdown:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.updateForm.valid && this.selectedBreakdownId) {
      this.breakdownService.updateBreakdown(this.selectedBreakdownId, this.updateForm.value).subscribe(
        () => {
          this.selectedBreakdownId = null;
          this.loadBreakdowns();
        },
        error => {
          this.errorMessage = 'Error updating breakdown. Please try again later.';
          console.error('Error updating breakdown:', error);
        }
      );
    }
  }

  cancelUpdate(): void {
    this.selectedBreakdownId = null;
  }
}
