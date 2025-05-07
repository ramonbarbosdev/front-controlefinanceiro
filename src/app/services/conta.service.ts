import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TipocontaService } from './tipoconta.service';
import { StatusContaService } from './status-conta.service';

@Injectable({
  providedIn: 'root',
})
export class ContaService {
  private readonly apiUrl = `${environment.apiUrl}/conta`;
  private router = inject(Router);
  tipoContaService = inject(TipocontaService);
  statusContaService = inject(StatusContaService);

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
  buscarDadosAdicionais(itens: any[]) {
    const reqTipoConta = itens.map((item) =>
      this.tipoContaService.obterPorId(item.id_tipoconta)
    );
    const reqStatusConta = itens.map((item) =>
      this.statusContaService.obterPorId(item.id_statusconta)
    );

    return forkJoin([forkJoin(reqTipoConta), forkJoin(reqStatusConta)]).pipe(
      map(([tiposConta, statusConta]) =>
        this.mapearDadosCompletos(itens, tiposConta, statusConta)
      )
    );
  }

  mapearDadosCompletos(itens: any[], tiposConta: any[], statusConta: any[]) {
    return itens.map((item, index) => ({
      ...item,
      nm_tipoconta: tiposConta[index]?.nm_tipoconta,
      nm_statusconta: statusConta[index]?.nm_statusconta,
    }));
  }
}
