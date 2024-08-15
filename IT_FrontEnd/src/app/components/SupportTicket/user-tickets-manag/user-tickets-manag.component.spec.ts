import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTicketsManagComponent } from './user-tickets-manag.component';

describe('UserTicketsManagComponent', () => {
  let component: UserTicketsManagComponent;
  let fixture: ComponentFixture<UserTicketsManagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTicketsManagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserTicketsManagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
