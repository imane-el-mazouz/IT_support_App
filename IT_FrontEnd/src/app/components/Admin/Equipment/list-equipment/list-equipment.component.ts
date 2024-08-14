import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { Equipment } from "../../../../model/Equipment/equipment";
import { Breakdown } from "../../../../model/Breakdow/breakdown";
import { EquipmentService } from "../../../../service/equipment/equipment.service";
import { BreakdownService } from "../../../../service/breakdown/breakdown.service";

@Component({
  selector: 'app-list-equipment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-equipment.component.html',
  styleUrls: ['./list-equipment.component.scss']
})
export class ListEquipmentComponent implements OnInit {
  equipments: Equipment[] = [];
  breakdowns: Breakdown[] = [];
  selectedEquipmentId: number | null = null;
  loading: boolean = false;
  errorMessage: string | null = null;
  showUpdateButton: boolean = false; // Add this flag

  constructor(
    private equipmentService: EquipmentService,
    private breakdownService: BreakdownService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.equipmentService.getEquipments().subscribe(
      data => {
        this.equipments = data;
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Error fetching equipments. Please try again later.';
        console.error('Error fetching equipments:', error);
        this.loading = false;
      }
    );
  }

  editEquipment(id: number): void {
    this.router.navigate([`/update-equipment/${id}`]);
  }


  deleteEquipment(id: number): void {
    if (confirm('Are you sure you want to delete this equipment?')) {
      this.equipmentService.deleteEquipment(id).subscribe(
        () => {
          this.equipments = this.equipments.filter(e => e.id !== id);
        },
        error => {
          this.errorMessage = 'Error deleting equipment. Please try again later.';
          console.error('Error deleting equipment:', error);
        }
      );
    }
  }

  viewBreakdowns(equipmentId: number): void {
    this.loading = true;
    this.breakdownService.getBreakdownsByEquipmentId(equipmentId).subscribe(
      (data: Breakdown[]) => {
        this.breakdowns = data;
        this.selectedEquipmentId = equipmentId;
        this.showUpdateButton = true;
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Error fetching breakdowns. Please try again later.';
        console.error('Error fetching breakdowns:', error);
        this.loading = false;
      }
    );
  }

  editBreakdown(id: number): void {
    this.router.navigate([`/update-breakdown/${id}`]);
  }

  deleteBreakdown(id: number): void {
    if (confirm('Are you sure you want to delete this breakdown?')) {
      this.breakdownService.deleteBreakdown(id).subscribe(
        () => {
          this.breakdowns = this.breakdowns.filter(b => b.id !== id);
        },
        error => {
          this.errorMessage = 'Error deleting breakdown. Please try again later.';
          console.error('Error deleting breakdown:', error);
        }
      );
    }
  }
}
