import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsByTechnicianComponent } from './tickets-by-technician.component';

describe('TicketsByTechnicianComponent', () => {
  let component: TicketsByTechnicianComponent;
  let fixture: ComponentFixture<TicketsByTechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsByTechnicianComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketsByTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
