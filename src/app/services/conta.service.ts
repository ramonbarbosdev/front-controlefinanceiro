import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TipocontaService } from './tipoconta.service';

@Injectable({
  providedIn: 'root',
})
export class ContaService {
  private readonly apiUrl = `${environment.apiUrl}/conta`;
  private router = inject(Router);
  tipoContaService = inject(TipocontaService);

  constructor(private http: HttpClient) {}

  obterTodos(): Observable<any> {
    const url = `${this.apiUrl}/`;

    return this.http
      .get(url)
      .pipe(catchError((error) => throwError(() => error)));
  }

  obterPorId(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;

    return this.http
      .get(url)
      .pipe(catchError((error) => throwError(() => error)));
  }

  cadastrar(data: any): Observable<any> {
    const url = `${this.apiUrl}/`;

    return this.http
      .post(url, data)
      .pipe(catchError((error) => throwError(() => error)));
  }

  atualizar(data: any): Observable<any> {
    const url = `${this.apiUrl}/`;

    return this.http
      .put(url, data)
      .pipe(catchError((error) => throwError(() => error)));
  }

  deletar(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;

    return this.http
      .delete(url)
      .pipe(catchError((error) => throwError(() => error)));
  }

  sequencia() {
    const url = `${this.apiUrl}/sequencia`;
    return this.http
      .get(url)
      .pipe(catchError((error) => throwError(() => error)));
  }

  //Buscar dados que tem vinculo com a tabela
  buscarDadosAdicionais(itens: any[])
  {
    const reqTipoConta = itens.map((item) =>
      this.tipoContaService.obterPorId(item.id_tipoconta)
    );

    return forkJoin([forkJoin(reqTipoConta),]).pipe(
      map(
        ([tiposConta]) => this.mapearDadosCompletos(itens, tiposConta)
      )
    );
  }

  mapearDadosCompletos(itens: any[], tiposConta: any[]) {
    return itens.map((item, index) => (
    {
      ...item,
      nm_tipoconta: tiposConta[index]?.nm_tipoconta,
    }));
  }
}
