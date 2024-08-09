import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/singup/singup.component";
import {DashUserComponent} from "./components/Dash User/dash-user.component";
import {DashTechComponent} from "./components/dash-tech/dash-tech.component";
import {AdminComponent} from "./components/Admin/admin.component";
import {GuardService} from "./service/auth_guard/guard.service";
import {GuardComponent} from "./components/guard/guard.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path : 'signup' , component: SignupComponent},
  { path : 'home' , component: SignupComponent},
  { path : 'dashboard' , component: AdminComponent},
  { path : 'technician' , component: DashTechComponent},
  { path : 'userU' , component: DashUserComponent},
  { path: 'access-denied', component: GuardComponent },







];
