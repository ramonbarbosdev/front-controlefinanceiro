import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  obterObjeto(map: string): Observable<any> {
    const url = `${this.apiUrl}/${map}/`;

    return this.http
      .get(url)
      .pipe(catchError((error) => throwError(() => error)));
  }

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
