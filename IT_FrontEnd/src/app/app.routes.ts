import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/Admin/singup/singup.component";
import {DashUserComponent} from "./components/Dash User/dash-user.component";
import {DashTechComponent} from "./components/dash-tech/dash-tech.component";
import {AdminComponent} from "./components/Admin/admin.component";
import {GuardService} from "./service/auth_guard/guard.service";
import {GuardComponent} from "./components/guard/guard.component";
import {Role} from "./enums/role";
import {SaveUserComponent} from "./components/Admin/save-user/save-user.component";
import {SaveTechnicianComponent} from "./components/Admin/save-technician/save-technician.component";
import {ListUsersComponent} from "./components/Admin/list-users/list-users.component";
import {ListEquipmentComponent} from "./components/Equipment/list-equipment/list-equipment.component";
import {AddEquipmentComponent} from "./components/Equipment/add-equipment/add-equipment.component";
import {UpdateEquipmentComponent} from "./components/Equipment/update-equipment/update-equipment.component";
import {ListBreakdownComponent} from "./components/Breakdown/list-breakdown/list-breakdown.component";
import {SaveBreakdownComponent} from "./components/Breakdown/save-breakdown/save-breakdown.component";
import {UpdateBreakdownComponent} from "./components/Breakdown/update-breakdown/update-breakdown.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path : 'signup' , component: SignupComponent},
  { path : 'home' , component: SignupComponent},
  // { path : 'dashboard' , component: AdminComponent},
  // { path : 'technician' , component: DashTechComponent},
  // { path : 'userU' , component: DashUserComponent},
  { path: 'technician', component: DashTechComponent, canActivate: [GuardService], data: { expectedRole: Role.Technician }},
  { path: 'userU', component: DashUserComponent, canActivate: [GuardService], data: { expectedRole: Role.UserU }},
  { path: 'dashboard', component: AdminComponent, canActivate: [GuardService], data: { expectedRole: Role.Admin }},
  { path: 'access-denied', component: GuardComponent },
  { path: 'saveUser', component: SaveUserComponent },
  { path: 'saveTech', component: SaveTechnicianComponent },
  { path: 'users', component: ListUsersComponent },
  { path: 'equipments', component: ListEquipmentComponent },
  { path: 'add', component: AddEquipmentComponent },
  { path: 'update-equipment/:id', component: UpdateEquipmentComponent },
  { path: 'list-breakdowns', component: ListBreakdownComponent },
  { path: 'add-breakdown', component: SaveBreakdownComponent },
  { path: 'update-breakdown/:id', component: UpdateBreakdownComponent },






];
