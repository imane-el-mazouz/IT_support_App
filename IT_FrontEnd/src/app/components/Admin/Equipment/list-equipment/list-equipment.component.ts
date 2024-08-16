
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Equipment, EquipmentStatus} from '../../../../model/Equipment/equipment';
import { EquipmentService } from '../../../../service/equipment/equipment.service';
import { Router } from '@angular/router';
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-list-equipment',
  templateUrl: './list-equipment.component.html',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  styleUrls: ['./list-equipment.component.scss']
})
export class ListEquipmentComponent implements OnInit {
  equipments: Equipment[] = [];
  equipmentForm: FormGroup;
  selectedEquipment: Equipment | null = null;
  editing: boolean = false;
  loading: boolean = false;
  errorMessage: string | null = null;
  statusOptions = Object.values(EquipmentStatus);

  constructor(
    private fb: FormBuilder,
    private equipmentService: EquipmentService,
    private router: Router
  ) {
    this.equipmentForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      warrantyEndDate: ['', Validators.required],
      type: ['', Validators.required],
      equipmentstatus: ['', Validators.required]
    });
  }

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

  onEdit(equipment: Equipment): void {
    this.selectedEquipment = equipment;
    this.equipmentForm.patchValue(equipment);
    this.editing = true;
  }

  onSubmit(): void {
    if (this.selectedEquipment) {
      const updatedEquipment = { ...this.selectedEquipment, ...this.equipmentForm.value };
      this.equipmentService.updateEquipment(updatedEquipment.id, updatedEquipment).subscribe(
        () => {
          this.equipments = this.equipments.map(e =>
            e.id === updatedEquipment.id ? updatedEquipment : e
          );
          this.editing = false;
          this.selectedEquipment = null;
        },
        error => {
          this.errorMessage = 'Error updating equipment. Please try again later.';
          console.error('Error updating equipment:', error);
        }
      );
    }
  }

  onCancel(): void {
    this.editing = false;
    this.selectedEquipment = null;
    this.equipmentForm.reset();
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
    this.router.navigate([`/breakdowns/${equipmentId}`]);
  }
}
