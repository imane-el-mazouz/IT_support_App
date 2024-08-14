import {Component, OnInit} from '@angular/core';
import {CommonModule, NgFor, NgIf} from "@angular/common";
import {Technician} from "../../../../model/Technician/technician";
import {TechnicianService} from "../../../../service/technician/technician.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-list-techs',
  standalone: true,
  imports: [NgIf , NgFor , CommonModule , RouterLink],
  templateUrl: './list-techs.component.html',
  styleUrl: './list-techs.component.scss'
})
export class ListTechsComponent implements OnInit{
  technician : Technician[] = [];
  constructor(private techService : TechnicianService) {}

  ngOnInit(): void {
    this.techService.getTechnicians().subscribe(
      data => this.technician = data,
      error => console.error('Eroor during fetchnig technicians ' , error)
    );
  }

  deleteTech(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.techService.deleteTechnician(id).subscribe(
        () => {
          console.log('User deleted successfully');
          this.technician = this.technician.filter(t => t.id !== id);

        },
        error => console.error('Error deleting user:', error));
    }
  }



}
