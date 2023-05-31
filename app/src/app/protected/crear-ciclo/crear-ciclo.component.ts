import { ImdbService } from './../../_services/imdb-service.service';
import { Component } from '@angular/core';
import { imdb, Result } from '../../interfaces/imdb';
import { FormControl, FormGroup } from '@angular/forms';

import { Ciclo, CrearCiclo, Pelicula } from 'src/app/interfaces/ciclo';
import { CiclosService } from 'src/app/_services/ciclos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-ciclo',
  templateUrl: './crear-ciclo.component.html',
  styleUrls: ['./crear-ciclo.component.css']
})
export class CrearCicloComponent {
  searchForm: FormGroup;
  searchResults: Result[] = [];
  selectedMovies: Result[] = [];
  isLoading: boolean = false;


  constructor(
    private imdbService: ImdbService,
    private cicloService: CiclosService,
    private router: Router
  ) {
    this.searchForm = new FormGroup({
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      query: new FormControl('')
    });
  }

  searchMovies() {
    this.isLoading = true;
    const query = this.searchForm.get('query')?.value;
    if (query) {
      this.imdbService.searchMovie(query).subscribe((data: imdb) => {
        this.searchResults = data.results;
        this.isLoading = false; // Establecer isLoading en false cuando se reciban los resultados
      }, (error) => {
        this.isLoading = false; // Establecer isLoading en false en caso de error
        console.error('Error al buscar películas:', error);
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
    if (this.searchForm.invalid) {
      // Realizar acciones adicionales si el formulario es inválido (mostrar mensajes de error, etc.)
      return;
    }

    const nombre = this.searchForm.get('nombre')?.value;
    const descripcion = this.searchForm.get('descripcion')?.value;
    const autor = localStorage.getItem('id') ?? '';
    const peliculas = this.selectedMovies.map((movie) => {
      const pelicula: Pelicula = {
        idExterno: movie.id,
        image: movie.image,
        title: movie.title,
        descripcion: movie.description
      };
      return pelicula;
    });

    const ciclo: CrearCiclo = {
      nombre,
      descripcion,
      peliculas,
      autor,
    };

    this.cicloService.crearCiclo(ciclo).subscribe(
      (data) => {
        console.log(data);
        // Realizar acciones adicionales si es necesario
      },
      (error) => {
        console.error('Error al crear el ciclo:', error);
        // Mostrar mensaje de error al usuario o realizar acciones adicionales para manejar el error
      }
    );

    this.searchForm.reset();

    setTimeout(() => {
      this.router.navigateByUrl('/home/list');
    }, 2000);
  }

  goBack() {
    this.router.navigateByUrl('/home/list');
  }

  removeFromForm(movie: Result) {
    const index = this.selectedMovies.findIndex((m) => m.title === movie.title);
    if (index !== -1) {
      this.selectedMovies.splice(index, 1);
    }
  }

}
