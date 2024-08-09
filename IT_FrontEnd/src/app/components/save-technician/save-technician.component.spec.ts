import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTechnicianComponent } from './save-technician.component';

describe('SaveTechnicianComponent', () => {
  let component: SaveTechnicianComponent;
  let fixture: ComponentFixture<SaveTechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveTechnicianComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
