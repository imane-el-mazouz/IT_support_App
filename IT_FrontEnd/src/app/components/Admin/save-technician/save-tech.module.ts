import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveUserComponent } from "../save-user/save-user.component";
import { SaveTechnicianComponent } from "./save-technician.component";

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SaveUserComponent,
    SaveTechnicianComponent
  ]
})
export class SaveTechModule { }
