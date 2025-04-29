import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipocategoriaService {
  private readonly apiUrl = `${environment.apiUrl}/tipocategoria`;
  private router = inject(Router);

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
}
