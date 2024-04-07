import { TestBed } from '@angular/core/testing';

import { CommandListenerService } from './command-listener.service';

describe('CommandListenerService', () => {
  let service: CommandListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
