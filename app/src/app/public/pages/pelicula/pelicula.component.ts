import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImdbService } from 'src/app/_services/imdb-service.service';
import { Movie } from 'src/app/interfaces/movie';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  movie?: Movie;

  constructor(

    public imdbService: ImdbService,
    public route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')! || '';

    console.log('ID:', id); // Verifica el valor de ID obtenido

    this.imdbService.getMovie(id).subscribe(
      (movie) => {
        this.movie = movie;
        console.log('Movie:', movie); // Verifica el valor de la película
      },
      (error) => {
        console.log('Error:', error); // Verifica si se produce algún error en la solicitud
      }
    );
  }


  goBack(): void {
    window.history.back();
  }



}
