import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Reader } from './reader';

describe('Reader', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reader],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Reader);
    expect(fixture.componentInstance).toBeTruthy();
  });
});