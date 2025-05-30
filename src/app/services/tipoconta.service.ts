import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipocontaService {
  private readonly apiUrl = `${environment.apiUrl}/tipoconta`;
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
    if (id)
    {
      return this.http.get(url).pipe(catchError((error) => throwError(() => error)));
    }
    return of(false);
  }

  cadastrar(data: any): Observable<any> {
    const url = `${this.apiUrl}/`;

    return this.http
      .post(url, data)
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
