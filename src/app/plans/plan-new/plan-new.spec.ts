import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanNew } from './plan-new';

describe('PlanNew', () => {
  let component: PlanNew;
  let fixture: ComponentFixture<PlanNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanNew],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
