import { TestBed } from '@angular/core/testing';

import { TipooperacaoService } from './tipooperacao.service';

describe('TipooperacaoService', () => {
  let service: TipooperacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipooperacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
