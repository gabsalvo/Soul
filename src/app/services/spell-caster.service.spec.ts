import { TestBed } from '@angular/core/testing';

import { SpellCasterService } from './spell-caster.service';

describe('SpellCasterService', () => {
  let service: SpellCasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpellCasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
