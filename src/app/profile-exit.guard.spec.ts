import { TestBed } from '@angular/core/testing';

import { ProfileExitGuard } from './profile-exit.guard';

describe('ProfileExitGuard', () => {
  let guard: ProfileExitGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfileExitGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
