import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { BookChapters } from './book-chapters';

describe('BookChapters', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookChapters],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BookChapters);
    expect(fixture.componentInstance).toBeTruthy();
  });
});