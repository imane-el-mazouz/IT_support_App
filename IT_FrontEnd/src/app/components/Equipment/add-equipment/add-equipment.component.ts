import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {Equipment, EquipmentStatus} from "../../../model/Equipment/equipment";
import { EquipmentService } from "../../../service/equipment/equipment.service";
import { Router } from "@angular/router";
import { TypeE } from "../../../enums/type-e";
import {Breakdown} from "../../../model/Breakdow/breakdown";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-add-equipment',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgForOf, KeyValuePipe],
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.scss']
})
export class AddEquipmentComponent {
  equipmentForm: FormGroup;
  typeOptions = Object.values(TypeE);
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
      equipmentstatus: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.equipmentForm.valid) {
      const equipment: Equipment = this.equipmentForm.value;
      this.equipmentService.saveEquipment(equipment).subscribe(
        () => this.router.navigate(['/equipments']),
        error => {
          console.error('Error saving equipment:', error);
          if (error.status === 403) {
            alert('You do not have permission to perform this action.');
          }
        }
      );
    }
  }

}
