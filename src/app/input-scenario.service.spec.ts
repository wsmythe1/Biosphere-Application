import { TestBed } from '@angular/core/testing';

import { InputScenarioService } from './input-scenario.service';

describe('InputScenarioService', () => {
  let service: InputScenarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputScenarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
