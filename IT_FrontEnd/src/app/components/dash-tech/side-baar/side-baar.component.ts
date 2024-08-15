import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-side-baar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './side-baar.component.html',
  styleUrl: './side-baar.component.scss'
})
export class SideBaarComponent {
  technicianId: number = 4;

}
