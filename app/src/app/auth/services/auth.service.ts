import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { catchError, map, of, pipe, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl
  private _ususario!: Usuario;

  get usuario() {
    return {...this._ususario}
  }

  constructor(private http: HttpClient) { }

  login(email:string, password:string) {

    //no me suscribo aquí sino donde llame el método

    const url = `${this.baseUrl}/auth`
    const body = {email, password}

    //AuthResponse es la interfaz que creamos para la respuesta del backend
    return this.http.post<AuthResponse>(url,body)
      .pipe(
        tap(resp => {
          if(resp.ok ){
            localStorage.setItem('token', resp.token!)
            localStorage.setItem('name', resp.name!)
            localStorage.setItem('id', resp.uid!)
            localStorage.setItem('esAdmin', resp.esAdmin ? resp.esAdmin.toString() : 'false')
            this._ususario = {
              email: resp.email!,
              name: resp.name!,
              uid: resp.uid!,
              esAdmin: resp.esAdmin!
            }
          }
        }),
        //map muta la respuesta
        map(resp => resp.ok), //devuelve sólo el OK
        catchError( err => of(err.error)) //con el of transformo el false en un observable
      )
  }

  registro(name:string, email:string, password:string) {

    const url = `${this.baseUrl}/auth/new`
    const body = {name ,email, password}

    return this.http.post<AuthResponse>(url,body)
      .pipe(
        tap(resp => {
          if(resp.ok ){
            localStorage.setItem('token', resp.token!)
            localStorage.setItem('name', resp.name!)
            localStorage.setItem('id', resp.uid!)
            localStorage.setItem('esAdmin', resp.esAdmin ? resp.esAdmin.toString() : 'false')

            this._ususario = {
              email: resp.email!,
              name: resp.name!,
              uid: resp.uid!,
              esAdmin: resp.esAdmin!
            }
          }
        }
        ),
        map(resp => resp.ok), //devuelve sólo el OK
        catchError( err => of(err.error)) //con el of transformo el false en un observable
      )
  }

  validarToken():Observable<boolean>  {
    const url = `${this.baseUrl}/auth/renew`; //endpoint
    const headers = new HttpHeaders ()
      .set('x-token', localStorage.getItem('token') || '') //el token puede ser null

    return this.http.get<AuthResponse>(url, {headers})
      .pipe(
        map( (resp: any) => {
          localStorage.setItem('token', resp.token!)
            localStorage.setItem('name', resp.name!)
            localStorage.setItem('id', resp.uid!)
            localStorage.setItem('esAdmin', resp.esAdmin ? resp.esAdmin.toString() : 'false')

          this._ususario = {
            email: resp.email,
            name: resp.name,
            uid: resp.uid,
            esAdmin: resp.esAdmin
          }
          return resp.ok
        }
        ),
        catchError( err => of(false)) //con el of transformo el false en un observable
      )
  }

  logout(){
    localStorage.clear()
  }

}
