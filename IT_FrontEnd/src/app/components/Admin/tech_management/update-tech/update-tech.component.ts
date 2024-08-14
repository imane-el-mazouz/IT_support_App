import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {UserUService} from "../../../../service/user/user.service";
import {User} from "../../../../model/User/user";
import {TechnicianService} from "../../../../service/technician/technician.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-update-tech',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterOutlet
  ],
  templateUrl: './update-tech.component.html',
  styleUrl: './update-tech.component.scss'
})
export class UpdateTechComponent {

  techForm: FormGroup = this.fb.group({});
  techId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private techService: TechnicianService,
    private fb: FormBuilder
  ) {

    this.techForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],

    });

  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null && !isNaN(+idParam)) {
      this.techId = +idParam;
      this.loadTech();
    } else {
      console.error('Error: Invalid UserID parameter');
    }
  }

  loadTech(): void {
    if (this.techId !== undefined) {
      this.techService.getTechnicianById(this.techId).subscribe(
        (user: User) => {
          this.techForm = this.fb.group({
            name: [user.name, Validators.required],
            email: [user.email, [Validators.required, Validators.email]],
            password: [user.password, Validators.required],
          });
        },
        error => console.error('Error loading user:', error)
      );
    }
  }

  onSubmit(): void {
    if (this.techForm.valid) {
      this.techService.updateTechnician(this.techId, this.techForm.value).subscribe(
        () => {
          console.log('User updated successfully');
          this.router.navigate(['/equipments']);
        },
        error => console.error('Error updating user:', error)
      );
    }
  }
}
