import { TestBed } from '@angular/core/testing';

import { TipocontaService } from './tipoconta.service';

describe('TipocontaService', () => {
  let service: TipocontaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipocontaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
