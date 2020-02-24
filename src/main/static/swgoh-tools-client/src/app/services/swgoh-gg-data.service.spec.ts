import { TestBed } from '@angular/core/testing';

import { SwgohGgDataService } from './swgoh-gg-data.service';

describe('SwgohGgDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SwgohGgDataService = TestBed.get(SwgohGgDataService);
    expect(service).toBeTruthy();
  });
});
