import { Component } from '@angular/core';
import {ListUsersComponent} from "../list-users/list-users.component";
import {SaveUserComponent} from "../save-user/save-user.component";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    ListUsersComponent,
    SaveUserComponent
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent {

}
