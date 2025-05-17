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

  obterObjetoRelacionado(endpoint: string, relacionadoObjeto: any) {
    this.obterObjeto(endpoint).subscribe({
      next: (res: any) => {
        return ((relacionadoObjeto as any)[endpoint] = res);
      },
    });
  }

  getNomeRelacionado(
    campo: string,
    id: number,
    nomeCampoLista: string,
    campoId: string,
    campoNome: string,
    relacionadoObjeto: any
  ): string {
    const lista = (relacionadoObjeto as any)[nomeCampoLista];
    return (
      lista?.find((item: any) => item[campoId] === id)?.[campoNome] ?? '---'
    );
  }

  obterObjeto(map: string): Observable<any> {
    const url = `${this.apiUrl}/${map}/`;

    return this.http
      .get(url)
      .pipe(catchError((error) => throwError(() => error)));
  }

  obterTodos(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/`;

    return this.http
      .get(url)
      .pipe(catchError((error) => throwError(() => error)));
  }

  obterPorId(endpoint: string, id: number): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/${id}`;

    return this.http
      .get(url)
      .pipe(catchError((error) => throwError(() => error)));
  }

  cadastrar(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/`;

    return this.http
      .post(url, data)
      .pipe(catchError((error) => throwError(() => error)));
  }

  atualizar(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/`;

    return this.http
      .put(url, data)
      .pipe(catchError((error) => throwError(() => error)));
  }

  deletar(endpoint: string, id: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/${id}`;

    return this.http
      .delete(url)
      .pipe(catchError((error) => throwError(() => error)));
  }

  sequencia(endpoint:string) {
    const url = `${this.apiUrl}/${endpoint}/sequencia`;
    return this.http
      .get(url)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
