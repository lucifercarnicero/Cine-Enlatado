import { ImdbService } from './../../_services/imdb-service.service';
import { Component } from '@angular/core';
import { imdb, Result } from '../../interfaces/imdb';
import { FormControl, FormGroup } from '@angular/forms';

import { Ciclo, CrearCiclo, Pelicula } from 'src/app/interfaces/ciclo';
import { CiclosService } from 'src/app/_services/ciclos.service';

@Component({
  selector: 'app-crear-ciclo',
  templateUrl: './crear-ciclo.component.html',
  styleUrls: ['./crear-ciclo.component.css']
})
export class CrearCicloComponent {
  searchForm: FormGroup;
  searchResults: Result[] = [];
  selectedMovies: Result[] = [];

  constructor(
    private imdbService: ImdbService,
    private cicloService: CiclosService
  ) {
    this.searchForm = new FormGroup({
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      query: new FormControl('')
    });
  }

  searchMovies() {
    const query = this.searchForm.get('query')?.value;
    if (query) {
      this.imdbService.searchMovie(query).subscribe((data: imdb) => {
        this.searchResults = data.results;
      });
    }
  }

  addToForm(movie: Result) {
    const index = this.selectedMovies.findIndex((m) => m.title === movie.title);
    if (index === -1) {
      this.selectedMovies.push(movie);
    } else {
      this.selectedMovies.splice(index, 1);
    }
  }

  onSubmit() {
    const nombre = this.searchForm.get('nombre')?.value;
    const descripcion = this.searchForm.get('descripcion')?.value;
    const autor = localStorage.getItem('userId');
    const peliculas = this.selectedMovies.map((movie) => {
      const pelicula: Pelicula = {
        idExterno: movie.id,
      };
      return pelicula;
    });

    const ciclo: CrearCiclo = {
      autor: autor ?? '',
      descripcion: descripcion,
      nombre: nombre,
      //peliculas: peliculas,
    };


    this.cicloService.crearCiclo(ciclo).subscribe((data) => {
      console.log(data);

      this.searchForm.reset();
    });
  }
}
