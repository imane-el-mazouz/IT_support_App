import { Component } from '@angular/core';
import {ListBreakdownComponent} from "../list-breakdown/list-breakdown.component";
import {SaveBreakdownComponent} from "../save-breakdown/save-breakdown.component";
import {UpdateBreakdownComponent} from "../update-breakdown/update-breakdown.component";

@Component({
  selector: 'app-breakdown-management',
  standalone: true,
  imports: [
    ListBreakdownComponent,
    SaveBreakdownComponent,
    UpdateBreakdownComponent
  ],
  templateUrl: './breakdown-management.component.html',
  styleUrl: './breakdown-management.component.scss'
})
export class BreakdownManagementComponent {

}
