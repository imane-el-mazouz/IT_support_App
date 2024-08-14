import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import {Technician} from "../../../../model/Technician/technician";
import {TechnicianService} from "../../../../service/technician/technician.service";

@Component({
  selector: 'app-save-technician',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './save-technician.component.html',
  styleUrls: ['./save-technician.component.scss']
})
export class SaveTechnicianComponent implements OnInit {
  saveTechnician: FormGroup;
  technicians: Technician[] = [];

  constructor(
    private fb: FormBuilder,
    private technicianService: TechnicianService,
    private router: Router
  ) {
    this.saveTechnician = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {
    this.technicianService.getTechnicians().subscribe({
      next: (technicians) => {
        this.technicians = technicians;
        console.log('Technicians loaded', this.technicians);
      },
      error: (error) => {
        console.error('Error loading technicians', error);
      }
    });
  }

  onSubmit(): void {
    if (this.saveTechnician.valid) {
      const technician: Technician = this.saveTechnician.value;
      this.technicianService.saveTechnician(technician).subscribe({
        next: (response) => {
          console.log('Technician saved successfully', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error during saving technician', error);
          alert('Error: ' + error.message);
          this.router.navigate(['/home']);
        }
      });
    }
  }
}

