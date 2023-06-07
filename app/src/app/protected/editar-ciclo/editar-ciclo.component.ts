import { ImdbService } from './../../_services/imdb-service.service';
import { Component, OnInit } from '@angular/core';
import { imdb, Result } from '../../interfaces/imdb';
import { FormControl, FormGroup } from '@angular/forms';

import { Ciclo, CrearCiclo, EditarCiclo, Pelicula } from 'src/app/interfaces/ciclo';
import { CiclosService } from 'src/app/_services/ciclos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-ciclo',
  templateUrl: './editar-ciclo.component.html',
  styleUrls: ['./editar-ciclo.component.css']
})
export class EditarCicloComponent implements OnInit {
  searchForm: FormGroup;
  searchResults: Result[] = [];
  selectedMovies: Result[] = [];
  isLoading: boolean = false;
  ciclo: Ciclo | null = null;


  constructor(
    private imdbService: ImdbService,
    private ciclosService: CiclosService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.searchForm = new FormGroup({
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      query: new FormControl('')
    });
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')! || '';
    this.ciclosService.getCiclo(id).subscribe((ciclo) => {
      if (ciclo) {
        this.ciclo = ciclo;
        console.log(this.ciclo); // Aquí se muestra el ciclo por consola

        // Llenar el arreglo selectedMovies con las películas del ciclo
        this.selectedMovies = ciclo.peliculas!.map((pelicula) => {
          const movie: Result = {
            id: pelicula.idExterno,
            image: pelicula.image!,
            title: pelicula.title!,
            description: pelicula.descripcion!,

          };
          return movie;
        });
      } else {
        // Manejar el caso en que no se encuentra el ciclo
        this.selectedMovies = []; // Inicializar como arreglo vacío
        this.router.navigate(['/error']);
      }
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

    const nombreControl = this.searchForm.get('nombre');
    const descripcionControl = this.searchForm.get('descripcion');

    const nombre = nombreControl?.value !== '' ? nombreControl?.value : this.ciclo?.nombre;
    const descripcion = descripcionControl?.value !== '' ? descripcionControl?.value : this.ciclo?.descripcion;
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

    const cicloEditado: EditarCiclo = {
      nombre,
      descripcion,
      peliculas,
    };

    this.ciclosService.editarCiclo(this.ciclo!._id, cicloEditado).subscribe(
      (data) => {
        console.log(data);
        // Mostrar SweetAlert de éxito
        Swal.fire('Éxito', 'Ciclo editado exitosamente', 'success');
        // Realizar acciones adicionales si es necesario
      },
      (error) => {
        console.error('Error al editar el ciclo:', error);
        // Mostrar mensaje de error al usuario o realizar acciones adicionales para manejar el error
      }
    );

    this.searchForm.reset();

    setTimeout(() => {
      this.router.navigateByUrl('/dashboard/mis-ciclos');
    }, 2000);
  }

  goBack() {
    this.location.back();
  }

  removeFromForm(movie: Result) {
    const index = this.selectedMovies.findIndex((m) => m.title === movie.title);
    if (index !== -1) {
      this.selectedMovies.splice(index, 1);
    }
  }

}
