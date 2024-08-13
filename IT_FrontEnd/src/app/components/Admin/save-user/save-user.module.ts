import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveUserComponent } from './save-user.component';
import { SaveUserRoutingModule } from './save-user-routing.module';
import {SaveTechnicianComponent} from "../save-technician/save-technician.component";

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SaveUserRoutingModule,
    SaveUserComponent,
  ]
})
export class SaveUserModule { }
