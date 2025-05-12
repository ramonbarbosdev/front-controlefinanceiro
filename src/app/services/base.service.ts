import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService
{




  buscarDadosAdicionaisMulti<T>(
    itens: T[],
    campos: {
      campoId: keyof T;
      campoResultado: string;
      servico: (id: any) => Observable<any>;
      campoNome: string;
    }[]
  ): Observable<T[]> {
    const requisicoes = itens.map((item) =>
      forkJoin(
        campos.map((c) =>
          c
            .servico((item as any)[c.campoId]) // ⬅ Corrigido aqui
            .pipe(map((res) => ({ campo: c, resultado: res })))
        )
      ).pipe(
        map((resultados) => {
          const novoItem = { ...item };
          for (const { campo, resultado } of resultados) {
            (novoItem as any)[campo.campoResultado] =
              resultado?.[campo.campoNome];
          }
          return novoItem;
        })
      )
    );

    return forkJoin(requisicoes);
  }
}
