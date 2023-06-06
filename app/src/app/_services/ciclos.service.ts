import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ciclo, CrearCiclo } from '../interfaces/ciclo';

@Injectable({providedIn: 'root'})
export class CiclosService {

  constructor(private http: HttpClient) { }

  /*
  crearCiclo(ciclo: CrearCiclo): Observable<CrearCiclo> {
    return this.http.post<any>('http://localhost:3000/api/ciclos/crear', ciclo);
  }
  */

  crearCiclo(ciclo: CrearCiclo): Observable<any> {
    const url = `http://localhost:3000/api/ciclos/crear`;
    return this.http.post(url, ciclo);
  }


  eliminarCiclo(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/ciclos/eliminar/${id}`);
  }

  editarCiclo(id: string, ciclo: Ciclo): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/api/ciclos/editar/${id}`, ciclo);
  }

  buscarCiclos(nombre: string): Observable<Ciclo[]> {
    return this.http.get<Ciclo[]>(`http://localhost:3000/ciclos?nombre=${nombre}`);
  }

  obtenerCiclos(): Observable<Ciclo[]> {
    return this.http.get<Ciclo[]>('http://localhost:3000/api/ciclos/obtener');
  }

  getCiclo(id: string): Observable<Ciclo> {
    return this.http.get<Ciclo>(`http://localhost:3000/api/ciclos/get/${id}`);
  }

  likeCiclo(idCiclo:string, usuarioId: string): Observable<any> {
    const url = `http://localhost:3000/api/ciclos/like/${idCiclo}`;
    return this.http.post(url, { usuarioId }); // Enviar el objeto correctamente envuelto
  }

  dislikeCiclo(idCiclo: string, usuarioId: string): Observable<any> {
    const url = `http://localhost:3000/api/ciclos/dislike/${idCiclo}`;
    return this.http.post(url, { usuarioId });
  }

  getCiclosAutor(idAutor: string): Observable<Ciclo[]> {
    return this.http.get<Ciclo[]>(`http://localhost:3000/api/ciclos/get/autor/${idAutor}`);
  }




}
