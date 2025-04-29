import { TestBed } from '@angular/core/testing';

import { TipocategoriaService } from './tipocategoria.service';

describe('TipocategoriaService', () => {
  let service: TipocategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipocategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
