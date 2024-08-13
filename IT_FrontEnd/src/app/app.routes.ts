import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/Admin/singup/singup.component";
import {DashUserComponent} from "./components/Dash User/dash-user.component";
import {DashTechComponent} from "./components/dash-tech/dash-tech.component";
import {AdminComponent} from "./components/Admin/admin-dash/admin.component";
import {GuardService} from "./service/auth_guard/guard.service";
import {GuardComponent} from "./components/guard/guard.component";
import {Role} from "./enums/role";

import {SaveTicketComponent} from "./components/SupportTicket/save-ticket/save-ticket.component";
import {AssignTicketComponent} from "./components/SupportTicket/assign-ticket/assign-ticket.component";
import {TicketDetailsComponent} from "./components/SupportTicket/ticket-details/ticket-details.component";

import {UpdateTicketComponent} from "./components/SupportTicket/update-ticket/update-ticket.component";
import {NavComponent} from "./components/nav/nav.component";
import {UserTicketsComponent} from "./components/SupportTicket/user-tickets/user-tickets.component";
import {AdminTicketsComponent} from "./components/SupportTicket/admin-tickets/admin-tickets.component";
import {TechnicianTicketsComponent} from "./components/SupportTicket/technician-tickets/technician-tickets.component";
import {HOME} from "@angular/cdk/keycodes";
import {HomePageComponent} from "./components/Home/home-page/home-page.component";
import {UserPageComponent} from "./components/Admin/user_management/user-page/user-page.component";
import {TechsPageComponent} from "./components/Admin/tech_management/techs-page/techs-page.component";
import {SaveTechnicianComponent} from "./components/Admin/tech_management/save-technician/save-technician.component";
import {ListUsersComponent} from "./components/Admin/user_management/list-users/list-users.component";
import {SaveUserComponent} from "./components/Admin/user_management/save-user/save-user.component";
import {ListEquipmentComponent} from "./components/Admin/Equipment/list-equipment/list-equipment.component";
import {AddEquipmentComponent} from "./components/Admin/Equipment/add-equipment/add-equipment.component";
import {UpdateEquipmentComponent} from "./components/Admin/Equipment/update-equipment/update-equipment.component";
import {ListBreakdownComponent} from "./components/Admin/Breakdown/list-breakdown/list-breakdown.component";
import {SaveBreakdownComponent} from "./components/Admin/Breakdown/save-breakdown/save-breakdown.component";
import {UpdateBreakdownComponent} from "./components/Admin/Breakdown/update-breakdown/update-breakdown.component";
import {
  EquipmentManagementComponent
} from "./components/Admin/Equipment/equipment-management/equipment-management.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path : 'signup' , component: SignupComponent},
  // { path : 'dashboard' , component: AdminComponent},
  // { path : 'technician' , component: DashTechComponent},
  // { path : 'userU' , component: DashUserComponent},
  { path: 'technician', component: DashTechComponent, canActivate: [GuardService], data: { expectedRole: Role.Technician }},
  { path: 'userU', component: DashUserComponent, canActivate: [GuardService], data: { expectedRole: Role.UserU }},


  {
    path: 'dashboard',
    component: AdminComponent,
    canActivate: [GuardService],
    data: {expectedRole: Role.Admin},
    children: [
      { path : 'pageUser' , component: UserPageComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin }},
      { path : 'pageTech' , component: TechsPageComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin }},
      {path: 'access-denied', component: GuardComponent},
      { path: 'saveUser', component: SaveUserComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin }},
      { path: 'saveTech', component: SaveTechnicianComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin } },
      { path: 'users', component: ListUsersComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin }},
      { path: 'equipments', component: ListEquipmentComponent ,/* canActivate: [GuardService], data: { expectedRole: Role.Admin } */ },
      { path: 'add', component: AddEquipmentComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin }},
      { path: 'update-equipment/:id', component: UpdateEquipmentComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin } },
      { path: 'list-breakdowns', component: ListBreakdownComponent ,  /*canActivate: [GuardService], data: { expectedRole: Role.Admin } */},
      { path: 'add-breakdown', component: SaveBreakdownComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin } },
      { path: 'update-breakdown/:id', component: UpdateBreakdownComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin }},
      { path: 'ticket-details/:technicianId', component: TicketDetailsComponent },
      { path: 'assign-ticket/:ticketId', component: AssignTicketComponent, canActivate: [GuardService], data: { expectedRole: Role.Admin } },
      { path: 'equipments-page', component: EquipmentManagementComponent, canActivate: [GuardService], data: { expectedRole: Role.Admin } },

    ]
  },
  { path: 'access-denied', component: GuardComponent },


  { path: 'equipments', component: ListEquipmentComponent ,/* canActivate: [GuardService], data: { expectedRole: Role.Admin } */ },
  { path: 'update-equipment/:id', component: UpdateEquipmentComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin } },


  { path: 'add-ticket', component: SaveTicketComponent ,/* canActivate: [GuardService], data: { expectedRole: Role.UserU } */},
  { path: 'assign-ticket/:ticketId', component: AssignTicketComponent, canActivate: [GuardService], data: { expectedRole: Role.Admin } },
  { path: 'ticket-details/:technicianId', component: TicketDetailsComponent },
  { path: 'update-ticket-status/:ticketId', component: UpdateTicketComponent , canActivate: [GuardService], data: { expectedRole: Role.Technician } },

  { path: 'tickets', component: UserTicketsComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin } },
  { path: 'admin/tickets', component: AdminTicketsComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin }  },
  { path: 'saveTech', component: SaveTechnicianComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin } },

  { path: 'saveUser', component: SaveUserComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin }},
  { path: 'users', component: ListUsersComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin }},

  { path: 'technician-tickets/:technicianId', component: TechnicianTicketsComponent, canActivate: [GuardService], data: { expectedRole: Role.Technician } },

  { path : 'nav' , component: NavComponent},
  { path : 'home' , component: HomePageComponent},
  { path : 'pageUser' , component: UserPageComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }



];
