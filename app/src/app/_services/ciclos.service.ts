import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ciclo, CrearCiclo } from '../interfaces/ciclo';

@Injectable({providedIn: 'root'})
export class CiclosService {

  constructor(private http: HttpClient) { }

  crearCiclo(ciclo: CrearCiclo): Observable<CrearCiclo> {
    return this.http.post<any>('http://localhost:3000/api/ciclos/crear', ciclo);
  }


  eliminarCiclo(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/ciclos/${id}`);
  }

  editarCiclo(id: string, ciclo: Ciclo): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/ciclos/${id}`, ciclo);
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

}
