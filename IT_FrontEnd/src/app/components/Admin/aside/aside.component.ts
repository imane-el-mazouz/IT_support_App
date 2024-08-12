import { Component } from '@angular/core';
import {UserUService} from "../../../service/user/user.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent {
  constructor(private userService: UserUService) { }

  toggleSaveUserDisplay() {
    this.userService.toggleSaveUserDisplay(true);
  }

  hideSaveUser() {
    this.userService.toggleSaveUserDisplay(false);
  }
}
