import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ciclo } from '../interfaces/ciclo';

@Injectable({providedIn: 'root'})
export class ServiceNameService {

  constructor(private http: HttpClient) { }

  crearCiclo(ciclo: Ciclo): Observable<any> {
    return this.http.post<any>('http://localhost:3000/ciclos', ciclo);
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

}
