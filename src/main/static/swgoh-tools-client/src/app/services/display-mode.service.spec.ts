import { TestBed } from '@angular/core/testing';

import { DisplayModeService } from './display-mode.service';

describe('DisplayModeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisplayModeService = TestBed.get(DisplayModeService);
    expect(service).toBeTruthy();
  });
});
