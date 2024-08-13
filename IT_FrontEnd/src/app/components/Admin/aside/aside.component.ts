import { Component } from '@angular/core';
import {UserUService} from "../../../service/user/user.service";
import {RouterLink} from "@angular/router";
import {SaveUserComponent} from "../save-user/save-user.component";
import {NgIf} from "@angular/common";
import {SaveTechnicianComponent} from "../save-technician/save-technician.component";

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [
    RouterLink,
    SaveUserComponent,
    NgIf,
    SaveTechnicianComponent
  ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent {
  showSaveUserForm = false;
  showTechForm = false;
  constructor(private userService: UserUService) { }

  toggleSaveUserDisplay() {
    this.userService.toggleSaveUserDisplay(true);
  }
  toggleSaveTechDisplay() {
    this.userService.toggleSaveTechDisplay(true);
  }

  hideSaveUser() {
    this.userService.toggleSaveUserDisplay(false);
  }
}
