import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBreakdownComponent } from './update-breakdown.component';

describe('UpdateBreakdownComponent', () => {
  let component: UpdateBreakdownComponent;
  let fixture: ComponentFixture<UpdateBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBreakdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
