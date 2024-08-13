import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechsPageComponent } from './techs-page.component';

describe('TechsPageComponent', () => {
  let component: TechsPageComponent;
  let fixture: ComponentFixture<TechsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TechsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
