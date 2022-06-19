import { TestBed } from '@angular/core/testing';

import { ProtegerRutasGuard } from './proteger-rutas.guard';

describe('ProtegerRutasGuard', () => {
  let guard: ProtegerRutasGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtegerRutasGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
