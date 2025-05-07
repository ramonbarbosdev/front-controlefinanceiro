import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { TipocontaService } from './tipoconta.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusContaService {
  private readonly apiUrl = `${environment.apiUrl}/statusconta`;
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
}
