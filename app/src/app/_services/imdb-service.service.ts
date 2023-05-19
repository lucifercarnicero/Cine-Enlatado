import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { imdb } from '../interfaces/imdb';


const url= environment.imdbUrl

@Injectable({
  providedIn: 'root'
})

export class ImdbService {



  constructor(private http: HttpClient) { }

  getMovie(id: string) {
    return this.http.get(`${url}/Title/k_0z6jxv2i/${id}`);
  }

  searchMovie(title: string): Observable<any> {

    return this.http.get(`${url}/SearchTitle/k_1z3yuh2d/${title}`);
  }


}
