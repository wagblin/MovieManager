import { TestBed } from '@angular/core/testing';

import { DetailTvService } from './detail-tv.service';

describe('DetailTvService', () => {
  let service: DetailTvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailTvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
