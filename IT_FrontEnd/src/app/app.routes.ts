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





];
