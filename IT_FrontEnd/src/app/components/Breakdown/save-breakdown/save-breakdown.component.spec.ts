import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveBreakdownComponent } from './save-breakdown.component';

describe('SaveBreakdownComponent', () => {
  let component: SaveBreakdownComponent;
  let fixture: ComponentFixture<SaveBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveBreakdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
