import { TestBed } from '@angular/core/testing';

import { HotutilsDataService } from './hotutils-data.service';

describe('HotutilsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotutilsDataService = TestBed.get(HotutilsDataService);
    expect(service).toBeTruthy();
  });
});
