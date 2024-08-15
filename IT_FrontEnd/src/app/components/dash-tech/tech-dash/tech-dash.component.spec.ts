import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechDashComponent } from './tech-dash.component';

describe('TechDashComponent', () => {
  let component: TechDashComponent;
  let fixture: ComponentFixture<TechDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TechDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
