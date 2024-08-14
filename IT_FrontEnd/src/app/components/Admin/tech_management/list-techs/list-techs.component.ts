// import {Component, OnInit} from '@angular/core';
// import {CommonModule, NgFor, NgIf} from "@angular/common";
// import {Technician} from "../../../../model/Technician/technician";
// import {TechnicianService} from "../../../../service/technician/technician.service";
// import {RouterLink} from "@angular/router";
//
// @Component({
//   selector: 'app-list-techs',
//   standalone: true,
//   imports: [NgIf , NgFor , CommonModule , RouterLink],
//   templateUrl: './list-techs.component.html',
//   styleUrl: './list-techs.component.scss'
// })
// export class ListTechsComponent implements OnInit{
//   technician : Technician[] = [];
//   constructor(private techService : TechnicianService) {}
//
//   ngOnInit(): void {
//     this.techService.getTechnicians().subscribe(
//       data => this.technician = data,
//       error => console.error('Eroor during fetchnig technicians ' , error)
//     );
//   }
//
//   deleteTech(id: number): void {
//     if (confirm('Are you sure you want to delete this user?')) {
//       this.techService.deleteTechnician(id).subscribe(
//         () => {
//           console.log('User deleted successfully');
//           this.technician = this.technician.filter(t => t.id !== id);
//
//         },
//         error => console.error('Error deleting user:', error));
//     }
//   }
//
//
//
// }
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { TechnicianService } from '../../../../service/technician/technician.service';
import { Technician } from '../../../../model/Technician/technician';
import { NgIf, NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-techs',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, ReactiveFormsModule],
  templateUrl: './list-techs.component.html',
  styleUrls: ['./list-techs.component.scss']
})
export class ListTechsComponent implements OnInit {
  technicians: Technician[] = [];
  techForm: FormGroup;
  selectedTechId: number | null = null;

  constructor(
    private techService: TechnicianService,
    private fb: FormBuilder
  ) {
    this.techForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTechnicians();
  }

  loadTechnicians(): void {
    this.techService.getTechnicians().subscribe(
      data => this.technicians = data,
      error => console.error('Error fetching technicians', error)
    );
  }

  loadTech(id: number): void {
    this.techService.getTechnicianById(id).subscribe(
      (technician: Technician) => {
        this.selectedTechId = id;
        this.techForm.patchValue({
          name: technician.name,
          email: technician.email,
          password: technician.password,
        });
      },
      error => console.error('Error loading technician:', error)
    );
  }

  onSubmit(): void {
    if (this.techForm.valid && this.selectedTechId !== null) {
      this.techService.updateTechnician(this.selectedTechId, this.techForm.value).subscribe(
        () => {
          console.log('Technician updated successfully');
          this.selectedTechId = null; // Hide form after successful update
          this.loadTechnicians(); // Reload technicians to reflect changes
        },
        error => console.error('Error updating technician:', error)
      );
    }
  }

  deleteTech(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.techService.deleteTechnician(id).subscribe(
        () => {
          console.log('Technician deleted successfully');
          this.technicians = this.technicians.filter(t => t.id !== id);
        },
        error => console.error('Error deleting technician:', error)
      );
    }
  }
}
