import { TestBed } from '@angular/core/testing';

import { SoundService } from './sound.service';

describe('PianoService', () => {
  let service: SoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
