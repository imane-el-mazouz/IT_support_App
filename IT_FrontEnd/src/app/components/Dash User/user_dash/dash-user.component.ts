import { Component } from '@angular/core';
import {AsideComponent} from "../../Admin/aside/aside.component";
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";
import {SideComponent} from "../side/side.component";

@Component({
  selector: 'app-dash-user',
  standalone: true,
  imports: [
    AsideComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterOutlet,
    SideComponent
  ],
  templateUrl: './dash-user.component.html',
  styleUrl: './dash-user.component.scss'
})
export class DashUserComponent {

}
