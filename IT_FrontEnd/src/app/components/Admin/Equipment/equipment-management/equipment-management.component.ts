import { Component } from '@angular/core';
import {ListEquipmentComponent} from "../list-equipment/list-equipment.component";
import {AddEquipmentComponent} from "../add-equipment/add-equipment.component";
import {NgIf} from "@angular/common";
import {UpdateEquipmentComponent} from "../update-equipment/update-equipment.component";


@Component({
  selector: 'app-equipment-management',
  standalone: true,
  imports: [
    ListEquipmentComponent,
    AddEquipmentComponent,
    UpdateEquipmentComponent,
    NgIf
  ],
  templateUrl: './equipment-management.component.html',
  styleUrl: './equipment-management.component.scss'
})
export class EquipmentManagementComponent {

}
