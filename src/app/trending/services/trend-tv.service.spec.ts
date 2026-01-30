import { TestBed } from '@angular/core/testing';

import { TrendTvService } from './trend-tv.service';

describe('TrendTvService', () => {
  let service: TrendTvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrendTvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
