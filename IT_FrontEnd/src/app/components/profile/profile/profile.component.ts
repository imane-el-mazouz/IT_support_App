import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../service/profile_service/profile.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    DatePipe
  ],
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId: number | null = 1; // Replace with actual value
  profileForm: FormGroup;
  reservations: any[] = [];
  currentView: string = 'profile';

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      phone: [''],
      address: ['']
    });
  }

  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id')!; // Convert to number
    if (isNaN(this.userId)) {
      console.error('Invalid user ID:', this.userId);
      return;
    }
    this.loadUserProfile(this.userId);
  }


  loadUserProfile(userId: number): void {
    if (userId) {
      this.profileService.getUserProfile(userId).subscribe(
        (user) => {
          console.log('User Profile:', user);
          this.profileForm.patchValue({
            name: user.name,
            phone: user.phone,
            address: user.address
          });
        },
        (error) => {
          console.error('Error loading user profile:', error);
        }
      );
    } else {
      console.error('Invalid user ID:', userId);
    }
  }



  updateProfile(): void {
    if (this.profileForm.valid) {
      const updatedProfile = this.profileForm.value;
      this.profileService.updateUserProfile(this.userId, updatedProfile).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    } else {
      console.error('Profile form is invalid');
    }
  }

  changeView(view: string): void {
    this.currentView = view;
  }
}
