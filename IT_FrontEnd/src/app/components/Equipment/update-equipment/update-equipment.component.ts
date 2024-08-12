import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipmentService } from '../../../service/equipment/equipment.service';
import { NgForOf, NgIf } from "@angular/common";
import {EquipmentStatus} from "../../../model/Equipment/equipment";

@Component({
  selector: 'app-update-equipment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './update-equipment.component.html',
  styleUrls: ['./update-equipment.component.scss']
})
export class UpdateEquipmentComponent implements OnInit {
  equipmentForm: FormGroup;
  statusOptions = Object.values(EquipmentStatus);
  id: number | undefined;

  constructor(
    private fb: FormBuilder,
    private equipmentService: EquipmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.equipmentForm = this.fb.group({
      name: ['', Validators.required],
      description: ['' , Validators.required] ,
      purchaseDate: ['' , Validators.required],
      warrantyEndDate: ['' , Validators.required],
      type: ['' , Validators.required],
      equipmentstatus: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null && !isNaN(+idParam)) {
      this.id = +idParam;
      this.loadEquipment();
    } else {
      console.error('Error: Invalid ID parameter');
    }
  }

  loadEquipment(): void {
    this.equipmentService.getEquipmentById(this.id).subscribe(
      data => {
        console.log('Loaded Equipment:', data);
        this.equipmentForm.patchValue(data);
      },
      error => console.error('Error loading equipment:', error)
    );
  }


  onSubmit(): void {
    if (this.equipmentForm.valid) {
      this.equipmentService.updateEquipment(this.id, this.equipmentForm.value).subscribe(
        () => this.router.navigate(['/equipments']),
        error => console.error('Error updating equipment:', error)
      );
    }
  }
}
