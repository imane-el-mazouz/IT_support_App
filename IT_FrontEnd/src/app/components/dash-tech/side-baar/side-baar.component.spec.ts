import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBaarComponent } from './side-baar.component';

describe('SideBaarComponent', () => {
  let component: SideBaarComponent;
  let fixture: ComponentFixture<SideBaarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBaarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideBaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
