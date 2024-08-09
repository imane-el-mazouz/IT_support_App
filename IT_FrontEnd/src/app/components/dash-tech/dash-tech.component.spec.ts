import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTechComponent } from './dash-tech.component';

describe('DashTechComponent', () => {
  let component: DashTechComponent;
  let fixture: ComponentFixture<DashTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashTechComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
