import { Component } from '@angular/core';
import {SaveUserComponent} from "./save-user/save-user.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {UserUService} from "../../service/user/user.service";
import {AsideComponent} from "./aside/aside.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  imports: [
    SaveUserComponent,
    NgIf,
    AsyncPipe,
    RouterLink,
    AsideComponent,
    RouterOutlet
  ],
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  showSaveUser$ = this.userService.showSaveUser$;

  constructor(private userService: UserUService) { }

  toggleSaveUserDisplay() {
    this.userService.toggleSaveUserDisplay(true);
  }

  hideSaveUser() {
    this.userService.toggleSaveUserDisplay(false);
  }
}
