import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SaveTechnicianComponent} from "./save-technician.component";

const routes: Routes = [
  {
    path: '',
    component: SaveTechnicianComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaveTechRoutingModule{ }
