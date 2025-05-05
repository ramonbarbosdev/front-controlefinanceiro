import { TestBed } from '@angular/core/testing';

import { StatusContaService } from './status-conta.service';

describe('StatusContaService', () => {
  let service: StatusContaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusContaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
