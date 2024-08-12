import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianTicketsComponent } from './technician-tickets.component';

describe('TechnicianTicketsComponent', () => {
  let component: TechnicianTicketsComponent;
  let fixture: ComponentFixture<TechnicianTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicianTicketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TechnicianTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
