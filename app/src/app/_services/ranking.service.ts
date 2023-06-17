import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ranking } from '../interfaces/ranking';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  private apiUrl = 'api/ranking';
  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getRanking(): Observable<Ranking[]> {
    return this.http.get<Ranking[]>(`${this.baseUrl}/${this.apiUrl}/resultado`);
  }

  postRegistro(registro: Ranking): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${this.apiUrl}/nuevo-registro`, registro);
  }
}
