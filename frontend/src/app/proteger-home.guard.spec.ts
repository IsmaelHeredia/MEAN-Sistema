import { TestBed } from '@angular/core/testing';

import { ProtegerHomeGuard } from './proteger-home.guard';

describe('ProtegerHomeGuard', () => {
  let guard: ProtegerHomeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtegerHomeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
