import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/Admin/singup/singup.component";
import {DashUserComponent} from "./components/Dash User/user_dash/dash-user.component";
import {AdminComponent} from "./components/Admin/admin-dash/admin.component";
import {GuardService} from "./service/auth_guard/guard.service";
import {GuardComponent} from "./components/guard/guard.component";
import {Role} from "./enums/role";

import {SaveTicketComponent} from "./components/SupportTicket/save-ticket/save-ticket.component";
import {AssignTicketComponent} from "./components/Admin/tickets-management/assign-ticket/assign-ticket.component";
import {TicketDetailsComponent} from "./components/SupportTicket/ticket-details/ticket-details.component";

import {UpdateTicketComponent} from "./components/SupportTicket/update-ticket/update-ticket.component";
import {UserTicketsComponent} from "./components/SupportTicket/user-tickets/user-tickets.component";
import {AdminTicketsComponent} from "./components/Admin/tickets-management/admin-tickets/admin-tickets.component";
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
import {UpdateUserComponent} from "./components/Admin/user_management/update-user/update-user.component";
import {UpdateTechComponent} from "./components/Admin/tech_management/update-tech/update-tech.component";
import {
  BreakdownManagementComponent
} from "./components/Admin/Breakdown/breakdown-management/breakdown-management.component";
import {TicketsPageComponent} from "./components/Admin/tickets-management/tickets-page/tickets-page.component";
import {UserTicketsManagComponent} from "./components/SupportTicket/user-tickets-manag/user-tickets-manag.component";
import {TechDashComponent} from "./components/dash-tech/tech-dash/tech-dash.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path : 'signup' , component: SignupComponent},
  // { path : 'dashboard' , component: AdminComponent},
  // { path : 'technician' , component: DashTechComponent},
  // { path : 'userU' , component: DashUserComponent},
  { path: 'technician', component: TechDashComponent, canActivate: [GuardService], data: { expectedRole: Role.Technician }},
  { path: 'userU', component: DashUserComponent, canActivate: [GuardService], data: { expectedRole: Role.UserU }},


  {
    path: 'userU',
    component: DashUserComponent ,
    canActivate: [GuardService],
    data: {expectedRole: Role.UserU},
    children: [
      { path : 'userU' , component: DashUserComponent , canActivate: [GuardService], data: { expectedRole: Role.UserU }},
      { path: 'add-ticket', component: SaveTicketComponent , canActivate: [GuardService], data: { expectedRole: Role.UserU } },
      { path: 'tickets', component: UserTicketsComponent /* , canActivate: [GuardService], data: { expectedRole: Role.Admin }*/ },
      { path: 'user-tickets-manag', component: UserTicketsManagComponent  , canActivate: [GuardService], data: { expectedRole: Role.UserU }},


    ]
  },
  {
    path: 'technician',
    component: TechDashComponent ,
    canActivate: [GuardService],
    data: {expectedRole: Role.Technician},
    children: [
      // { path: 'technician-tickets/:technicianId', component: TechnicianTicketsComponent, canActivate: [GuardService], data: { expectedRole: Role.Technician } },
      { path: 'technician-tickets/:technicianId', component: TechnicianTicketsComponent, canActivate: [GuardService], data: { expectedRole: Role.Technician } },
      { path: 'update-ticket-status/:ticketId', component: UpdateTicketComponent , canActivate: [GuardService], data: { expectedRole: Role.Technician } },
    ]
  },

  {
    path: 'dashboard',
    component: AdminComponent,
    canActivate: [GuardService],
    data: {expectedRole: Role.Admin},
    children: [
      { path : 'pageUser' , component: UserPageComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin }},
      { path : 'pageTech' , component: TechsPageComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin }},
      // {path: 'access-denied', component: GuardComponent},
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

      { path: 'equipments-page', component: EquipmentManagementComponent, canActivate: [GuardService], data: { expectedRole: Role.Admin } },
      { path: 'break-page', component: BreakdownManagementComponent, canActivate: [GuardService], data: { expectedRole: Role.Admin } },
      { path: 'tickets-management', component: TicketsPageComponent, canActivate: [GuardService], data: { expectedRole: Role.Admin } },

      { path: 'admin/tickets', component: AdminTicketsComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin }  },

      { path: 'assign-ticket/:ticketId', component: AssignTicketComponent, canActivate: [GuardService], data: { expectedRole: Role.Admin } },

      { path: 'breakdowns/:id', component: ListBreakdownComponent },

    ]
  },

  { path: 'access-denied', component: GuardComponent },


  { path: 'equipments', component: ListEquipmentComponent ,/* canActivate: [GuardService], data: { expectedRole: Role.Admin } */ },
  { path: 'update-equipment/:id', component: UpdateEquipmentComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin } },


  { path: 'add-ticket', component: SaveTicketComponent , canActivate: [GuardService], data: { expectedRole: Role.UserU } },
  { path: 'assign-ticket/:ticketId', component: AssignTicketComponent, canActivate: [GuardService], data: { expectedRole: Role.Admin } },
  { path: 'ticket-details/:technicianId', component: TicketDetailsComponent },
  { path: 'update-ticket-status/:ticketId', component: UpdateTicketComponent , canActivate: [GuardService], data: { expectedRole: Role.Technician } },

  { path: 'tickets', component: UserTicketsComponent /* , canActivate: [GuardService], data: { expectedRole: Role.Admin }*/ },
  { path: 'admin/tickets', component: AdminTicketsComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin }  },
  { path: 'saveTech', component: SaveTechnicianComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin } },

  { path: 'saveUser', component: SaveUserComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin }},
  { path: 'users', component: ListUsersComponent , canActivate: [GuardService], data: { expectedRole: Role.Admin }},

  { path: 'technician-tickets/:technicianId', component: TechnicianTicketsComponent, canActivate: [GuardService], data: { expectedRole: Role.Technician } },

  { path : 'home' , component: HomePageComponent},
  { path : 'pageUser' , component: UserPageComponent},
  { path : 'break-page' , component: BreakdownManagementComponent},
  { path : 'tickets-management' , component: BreakdownManagementComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'users/update/:id', component: UpdateUserComponent, canActivate: [GuardService], data: { expectedRole: Role.Admin }},
  { path: 'techs/update/:id', component: UpdateTechComponent, canActivate: [GuardService], data: { expectedRole: Role.Admin }},
  { path: 'update-breakdown/:id', component: UpdateBreakdownComponent, canActivate: [GuardService], data: { expectedRole: Role.Admin } },


  { path: 'user-tickets-manag', component: UserTicketsManagComponent  , canActivate: [GuardService], data: { expectedRole: Role.UserU }},
  { path: 'userU', component: DashUserComponent, canActivate: [GuardService], data: { expectedRole: Role.UserU }},

  // { path: 'technician-tickets/:technicianId', component: TechnicianTicketsComponent, canActivate: [GuardService], data: { expectedRole: Role.Technician } },
  { path: 'technician/technician-tickets', component: TechnicianTicketsComponent, canActivate: [GuardService], data: { expectedRole: Role.Technician } },
  { path: 'update-ticket-status/:ticketId', component: UpdateTicketComponent , canActivate: [GuardService], data: { expectedRole: Role.Technician } },

  { path: 'breakdowns/:id', component: ListBreakdownComponent },


];
