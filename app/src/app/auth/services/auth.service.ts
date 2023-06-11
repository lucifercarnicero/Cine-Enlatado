import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario, UsuarioEdit } from '../interfaces/interfaces';
import { catchError, map, of, pipe, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl
  private _ususario!: Usuario;

  get usuario() {
    return { ...this._ususario };
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/api/auth`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
            localStorage.setItem('name', resp.name!);
            localStorage.setItem('id', resp.uid!);

            if (localStorage.getItem('esAdmin') === null) {
              // Solo establece el valor si aún no existe en el localStorage
              localStorage.setItem('esAdmin', resp.esAdmin ? resp.esAdmin.toString() : 'false');
            }

            this._ususario = {
              email: resp.email!,
              name: resp.name!,
              _id: resp.uid!,
              esAdmin: resp.esAdmin!
            };
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error))
      );
  }

  registro(name: string, email: string, password: string) {
    const url = `${this.baseUrl}/api/auth/new`;
    const body = { name, email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
            localStorage.setItem('name', resp.name!);
            localStorage.setItem('id', resp.uid!);

            if (localStorage.getItem('esAdmin') === null) {
              // Solo establece el valor si aún no existe en el localStorage
              localStorage.setItem('esAdmin', resp.esAdmin ? resp.esAdmin.toString() : 'false');
            }

            this._ususario = {
              email: resp.email!,
              name: resp.name!,
              _id: resp.uid!,
              esAdmin: resp.esAdmin!
            };
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error))
      );
  }

  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/api/auth/renew`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map((resp: any) => {
          localStorage.setItem('token', resp.token!);
          localStorage.setItem('name', resp.name!);
          localStorage.setItem('id', resp.uid!);

          if (localStorage.getItem('esAdmin') === null) {
            // Solo establece el valor si aún no existe en el localStorage
            localStorage.setItem('esAdmin', resp.esAdmin ? resp.esAdmin.toString() : 'false');
          }

          this._ususario = {
            email: resp.email,
            name: resp.name,
            _id: resp.uid,
            esAdmin: resp.esAdmin
          };

          return resp.ok;
        }),
        catchError(err => of(false))
      );
  }

  logout() {
    localStorage.clear();
  }

  editarUsuario(id: string, usuario: UsuarioEdit) {
    return this.http.patch<Usuario>(`${this.baseUrl}/api/auth/edit/${id}`, usuario);
  }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/api/auth/users`);
  }

  eliminar(id: string) {
    return this.http.delete(`${this.baseUrl}/api/auth/delete/${id}`);
  }

  getUsuario(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/api/auth/user/${id}`);
  }
}
