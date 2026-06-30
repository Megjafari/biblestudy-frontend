import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ReaderHome } from './reader-home';

describe('ReaderHome', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReaderHome],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ReaderHome);
    expect(fixture.componentInstance).toBeTruthy();
  });
});