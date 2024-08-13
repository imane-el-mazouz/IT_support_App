import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgForOf } from '@angular/common';
import {Breakdown} from "../../../../model/Breakdow/breakdown";
import {BreakdownService} from "../../../../service/breakdown/breakdown.service";

@Component({
  selector: 'app-list-breakdown',
  standalone: true,
  imports: [CommonModule, NgForOf],
  templateUrl: './list-breakdown.component.html',
  styleUrls: ['./list-breakdown.component.scss']
})
export class ListBreakdownComponent implements OnInit {
  breakdowns: Breakdown[] = [];

  constructor(
    private breakdownService: BreakdownService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBreakdowns();
  }

  loadBreakdowns(): void {
    this.breakdownService.getBreakdowns()
      .subscribe(
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
    this.router.navigate([`/update-breakdown/${id}`]);
  }
}
