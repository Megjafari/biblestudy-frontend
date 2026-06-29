import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { PlanNew } from './plan-new';

describe('PlanNew', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanNew],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PlanNew);
    expect(fixture.componentInstance).toBeTruthy();
  });
});