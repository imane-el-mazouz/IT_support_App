import { Component } from '@angular/core';
import {UserTicketsComponent} from "../user-tickets/user-tickets.component";
import {SaveTicketComponent} from "../save-ticket/save-ticket.component";

@Component({
  selector: 'app-user-tickets-manag',
  standalone: true,
  imports: [
    UserTicketsComponent,
    SaveTicketComponent
  ],
  templateUrl: './user-tickets-manag.component.html',
  styleUrl: './user-tickets-manag.component.scss'
})
export class UserTicketsManagComponent {

}
