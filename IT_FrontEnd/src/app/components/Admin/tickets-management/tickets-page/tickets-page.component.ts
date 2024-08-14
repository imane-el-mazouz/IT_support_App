import { Component } from '@angular/core';
import {AdminTicketsComponent} from "../admin-tickets/admin-tickets.component";
import {AssignTicketComponent} from "../assign-ticket/assign-ticket.component";

@Component({
  selector: 'app-tickets-page',
  standalone: true,
  imports: [
    AdminTicketsComponent,
    AssignTicketComponent
  ],
  templateUrl: './tickets-page.component.html',
  styleUrl: './tickets-page.component.scss'
})
export class TicketsPageComponent {

}
