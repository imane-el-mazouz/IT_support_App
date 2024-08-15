import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SideBaarComponent} from "../side-baar/side-baar.component";

@Component({
  selector: 'app-tech-dash',
  standalone: true,
  imports: [
    RouterOutlet,
    SideBaarComponent,
  ],
  templateUrl: './tech-dash.component.html',
  styleUrl: './tech-dash.component.scss'
})
export class TechDashComponent {

}
