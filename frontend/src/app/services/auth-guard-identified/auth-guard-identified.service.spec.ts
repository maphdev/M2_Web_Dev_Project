import { TestBed } from '@angular/core/testing';

import { AuthGuardIdentifiedService } from './auth-guard-identified.service';

describe('AuthGuardIdentifiedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardIdentifiedService = TestBed.get(AuthGuardIdentifiedService);
    expect(service).toBeTruthy();
  });
});
