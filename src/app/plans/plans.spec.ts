import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Plans } from './plans';

describe('Plans', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Plans],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Plans);
    expect(fixture.componentInstance).toBeTruthy();
  });
});