import { TestBed } from '@angular/core/testing';

import { BaseserviceService } from './base.service';

describe('BaseserviceService', () => {
  let service: BaseserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
