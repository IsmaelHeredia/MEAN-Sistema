import { TestBed } from '@angular/core/testing';

import { ProtegerIngresoGuard } from './proteger-ingreso.guard';

describe('ProtegerIngresoGuard', () => {
  let guard: ProtegerIngresoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtegerIngresoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
