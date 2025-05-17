import { TestBed } from '@angular/core/testing';

import { MetodopagamentoService } from './metodopagamento.service';

describe('MetodopagamentoService', () => {
  let service: MetodopagamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetodopagamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
