import {Component, OnInit} from '@angular/core';
import {CommonModule, NgFor, NgIf} from "@angular/common";
import {Technician} from "../../../../model/Technician/technician";
import {TechnicianService} from "../../../../service/technician/technician.service";

@Component({
  selector: 'app-list-techs',
  standalone: true,
  imports: [NgIf , NgFor , CommonModule],
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

}
