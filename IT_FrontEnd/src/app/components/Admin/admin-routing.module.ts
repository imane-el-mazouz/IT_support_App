import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin-dash/admin.component';
import { SaveUserComponent } from './save-user/save-user.component';
import {SaveTechnicianComponent} from "./save-technician/save-technician.component";

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'dashboard', component: AdminComponent },
      { path: 'saveUser', component: SaveUserComponent },
      { path: 'saveTech', component: SaveTechnicianComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
