import { TestBed } from '@angular/core/testing';

import { AuthGuardNotIdentifiedService } from './auth-guard-not-identified.service';

describe('AuthGuardNotIdentifiedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardNotIdentifiedService = TestBed.get(AuthGuardNotIdentifiedService);
    expect(service).toBeTruthy();
  });
});
