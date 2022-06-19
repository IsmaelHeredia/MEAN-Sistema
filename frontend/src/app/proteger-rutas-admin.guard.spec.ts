import { TestBed } from '@angular/core/testing';

import { ProtegerRutasAdminGuard } from './proteger-rutas-admin.guard';

describe('ProtegerRutasAdminGuard', () => {
  let guard: ProtegerRutasAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtegerRutasAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
