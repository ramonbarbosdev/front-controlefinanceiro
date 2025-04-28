import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';
import { environment } from '../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}`;

  private router = inject(Router);
  constructor(private http: HttpClient) {}

  login(credenciais: { login: string; senha: string })
  {
    return this.http.post(`${this.apiUrl}/auth/login`, credenciais, {
      withCredentials: true,
    });
  }

  cadastrar(data: any): Observable<any> {
    const url = `${this.apiUrl}/auth/register`;

    return this.http
      .post(url, data)
      .pipe(catchError((error) => throwError(() => error)));
  }

  logout() {
    localStorage.removeItem(environment.nome_system+'_token');
    this.router.navigate(['/login']);
  }

  setToken(token: string) {
    localStorage.setItem(environment.nome_system+'_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem(environment.nome_system+'_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getHeaders() {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `${token}`,
    });
  }
}
