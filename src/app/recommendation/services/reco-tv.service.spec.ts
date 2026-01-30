import { TestBed } from '@angular/core/testing';

import { RecoTvService } from './reco-tv.service';

describe('RecoTvService', () => {
  let service: RecoTvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoTvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
