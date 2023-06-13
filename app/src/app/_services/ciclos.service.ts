import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ciclo, Comentario, CrearCiclo, EditarCiclo } from '../interfaces/ciclo';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class CiclosService {

  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  /*
  crearCiclo(ciclo: CrearCiclo): Observable<CrearCiclo> {
    return this.http.post<any>('http://localhost:3000/api/ciclos/crear', ciclo);
  }
  */

  crearCiclo(ciclo: CrearCiclo): Observable<any> {
    const url = `${this.baseUrl}/api/ciclos/crear`;
    return this.http.post(url, ciclo);
  }


  eliminarCiclo(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/ciclos/eliminar/${id}`);
  }

  editarCiclo(id: string, ciclo: EditarCiclo): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/api/ciclos/editar/${id}`, ciclo);
  }

  obtenerCiclos(): Observable<Ciclo[]> {
    return this.http.get<Ciclo[]>(`${this.baseUrl}/api/ciclos/obtener`);
  }

  getCiclo(id: string): Observable<Ciclo> {
    return this.http.get<Ciclo>(`${this.baseUrl}/api/ciclos/get/${id}`);
  }

  likeCiclo(idCiclo:string, usuarioId: string): Observable<any> {
    const url = `${this.baseUrl}/api/ciclos/like/${idCiclo}`;
    return this.http.post(url, { usuarioId }); // Enviar el objeto correctamente envuelto
  }

  dislikeCiclo(idCiclo: string, usuarioId: string): Observable<any> {
    const url = `${this.baseUrl}/api/ciclos/dislike/${idCiclo}`;
    return this.http.post(url, { usuarioId });
  }

  getCiclosAutor(idAutor: string): Observable<Ciclo[]> {
    return this.http.get<Ciclo[]>(`${this.baseUrl}/api/ciclos/get/autor/${idAutor}`);
  }

  comentarCiclo(idCiclo: string, comentario: Comentario): Observable<any> {
    const url = `${this.baseUrl}/api/ciclos/add/comentario/${idCiclo}`;
    return this.http.post(url, comentario);
  }

  borrarComentario(id:String, idCiclo:object): Observable<any> {
    const url = `${this.baseUrl}/api/ciclos/delete/comentario/${id}`;
    return this.http.delete(url, {body: idCiclo});
  }


}
