import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';

const imdbApiUrl = 'https://imdb-api.com/en/API/SearchTitle/k_1z3yuh2d/consulta'

@Injectable({
  providedIn: 'root'
})
export class ImdbService {

  constructor(private http: HttpClient) { }

  searchTitle(consulta: string): Observable<any> {
    const url = imdbApiUrl.replace('consulta', consulta);
    return this.http.get(url);
  }
}

