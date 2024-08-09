import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Technician} from "../../model/Technician/technician";

@Component({
  selector: 'app-save-technician',
  standalone: true,
  imports: [],
  templateUrl: './save-technician.component.html',
  styleUrl: './save-technician.component.scss'
})
export class SaveTechnicianComponent implements OnInit{
  saveTechnician : FormGroup;
  technicians : Technician[] = [];

  constructor(
    private
  ) {
  }
  ngOnInit(): void {
  }

}
