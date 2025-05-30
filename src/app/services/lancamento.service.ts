import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ContaService } from './conta.service';
import { Conta } from '../models/conta';
import { Statuslancamento } from '../models/statuslancamento';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  private readonly apiUrl = `${environment.apiUrl}/lancamento`;

  constructor(private http: HttpClient) {}

  relacionadoObjeto = {
    conta: [] as Conta[],
    statuslancamento: [] as Statuslancamento[],
  };

  baseService = inject(BaseService);

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
    const url = `${this.apiUrl}/cadastrar/`;

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

  obterStatusLancamentoPorId(id: number): Observable<any> {
    const url = `${environment.apiUrl}/statuslancamento/${id}`;

    return this.http
      .get(url)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
