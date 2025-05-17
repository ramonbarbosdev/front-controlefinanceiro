import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

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

    return this.http.get<any>(url).pipe(
      tap((res) => {
        return res;
      }),
      catchError((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao consultar o objeto!',
          text: e.error.error,
          confirmButtonText: 'OK',
        });
        return throwError(() => e);
      })
    );
  }

  obterTodos(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/`;

    return this.http.get<any>(url).pipe(
      tap((res) => {
        return res;
      }),
      catchError((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao consultar!',
          text: e.error.error,
          confirmButtonText: 'OK',
        });
        return throwError(() => e);
      })
    );
  }

  obterPorId(endpoint: string, id: number): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/${id}`;

    return this.http.get<any>(url).pipe(
      tap((res) => {
        return res;
      }),
      catchError((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao consultar por ID!',
          text: e.error.error,
          confirmButtonText: 'OK',
        });
        return throwError(() => e);
      })
    );
  }

  cadastrar(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/`;

    return this.http.post<any>(url, data).pipe(
        tap((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Cadastrado com sucesso!',
            confirmButtonText: 'OK',
          });
          return res;
        }),
        catchError((e) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao salvar!',
            text: e.error.error,
            confirmButtonText: 'OK',
          });
          return throwError(() => e);
        })
      );
  }

  atualizar(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/`;

    return this.http.put<any>(url, data).pipe(
      tap((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Atualizado com sucesso!',
          confirmButtonText: 'OK',
        });
        return res;
      }),
      catchError((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao salvar!',
          text: e.error.error,
          confirmButtonText: 'OK',
        });
        return throwError(() => e);
      })
    );
  }

  deletar(endpoint: string, id: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/${id}`;

    return this.http.delete<any>(url).pipe(
      tap((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: res?.error || 'Registro deletado com sucesso.',
          confirmButtonText: 'OK',
        });
      }),
      catchError((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: e?.error?.error || 'Erro ao deletar o registro.',
          confirmButtonText: 'OK',
        });
        return throwError(() => e);
      })
    );
  }

  sequencia(endpoint: string) {
    const url = `${this.apiUrl}/${endpoint}/sequencia`;

    return this.http.get<any>(url).pipe(
      tap((res) => {
        return res;
      }),
      catchError((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: e?.error?.error || 'Erro ao consultar a sequencia',
          confirmButtonText: 'OK',
        });
        return throwError(() => e);
      })
    );
  }
}
