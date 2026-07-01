import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Notes } from './notes';

describe('Notes', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Notes],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Notes);
    expect(fixture.componentInstance).toBeTruthy();
  });
});