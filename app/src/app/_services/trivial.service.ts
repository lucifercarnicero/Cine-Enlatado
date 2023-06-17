import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trivial } from '../interfaces/trivial';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrivialService {

  private apiUrl = 'api/trivial';
  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  crearPregunta(pregunta: Trivial): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${this.apiUrl}/crear`, pregunta);
  }

  eliminarPregunta(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${this.apiUrl}/${id}`);
  }

  editarPregunta(id: string, pregunta: Trivial): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${this.apiUrl}/${id}`, pregunta);
  }

  getPreguntas(): Observable<Trivial[]> {
    return this.http.get<Trivial[]>(`${this.baseUrl}/${this.apiUrl}/preguntas`);
  }
}
