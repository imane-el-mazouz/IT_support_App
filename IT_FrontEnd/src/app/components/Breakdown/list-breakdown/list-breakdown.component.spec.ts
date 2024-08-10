import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBreakdownComponent } from './list-breakdown.component';

describe('ListBreakdownComponent', () => {
  let component: ListBreakdownComponent;
  let fixture: ComponentFixture<ListBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBreakdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
