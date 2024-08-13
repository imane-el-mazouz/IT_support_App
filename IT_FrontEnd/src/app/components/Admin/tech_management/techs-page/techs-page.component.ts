import { Component } from '@angular/core';
import {ListTechsComponent} from "../list-techs/list-techs.component";
import {SaveTechnicianComponent} from "../save-technician/save-technician.component";

@Component({
  selector: 'app-techs-page',
  standalone: true,
  imports: [
    ListTechsComponent,
    SaveTechnicianComponent
  ],
  templateUrl: './techs-page.component.html',
  styleUrl: './techs-page.component.scss'
})
export class TechsPageComponent {

}
