import { TestBed } from '@angular/core/testing';

import { LostService } from './lost.service';

describe('LostService', () => {
  let service: LostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
