import { TestBed, async, inject } from '@angular/core/testing';

import { LogrouteGuard } from './logroute.guard';

describe('LogrouteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogrouteGuard]
    });
  });

  it('should ...', inject([LogrouteGuard], (guard: LogrouteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
