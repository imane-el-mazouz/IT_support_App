import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgFor, NgIf } from "@angular/common";
import { Equipment } from "../../../model/Equipment/equipment";
import { EquipmentService } from "../../../service/equipment/equipment.service";
import { Router } from "@angular/router";
import { EquipmentStatus } from "../../../enums/equipment-status";
import { TypeE } from "../../../enums/type-e";

@Component({
  selector: 'app-add-equipment',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.scss']
})
export class AddEquipmentComponent implements OnInit {
  equipmentForm: FormGroup;
  equipments: Equipment[] = [];
  statusOptions = Object.values(EquipmentStatus);
  typeOptions = Object.values(TypeE);

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
      equipmentStatus: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    this.equipmentService.getEquipments().subscribe(equipments => {
      this.equipments = equipments;
      console.log('Equipments loaded', this.equipments);
    });
  }

  onSubmit(): void {
    if (this.equipmentForm.valid) {
      const equipment: Equipment = this.equipmentForm.value;
      this.equipmentService.saveEquipment(equipment).subscribe({
        next: (response) => {
          console.log('Equipment saved successfully', response);
          this.router.navigate(['/equipments']);
        },
        error: (error) => {
          console.error('Error during saving equipment', error);
          this.router.navigate(['/home']);
        }
      });
    }
  }
}
