import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { CiclosService } from 'src/app/_services/ciclos.service';
import { ImdbService } from 'src/app/_services/imdb-service.service';
import { Ciclo } from 'src/app/interfaces/ciclo';
import { Movie } from 'src/app/interfaces/movie';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  ciclos: Ciclo[] = [];
  ciclosLength: number = 0;
  ciclosRandom: number[] = [];
  idPeli: string = "";
  idExternos: string[] = [];



  constructor (
    private ciclosService: CiclosService,
    private router: Router,

  ) {
    this.ciclosService.obtenerCiclos().subscribe(
      data => {
        this.ciclos = data;
        this.ciclosLength = data.length;

        // Ordenar los ciclos por numLikes de mayor a menor
        this.ciclos.sort((a, b) => (b.numLikes || 0) - (a.numLikes || 0));

        // Obtener solo los cinco primeros ciclos
        this.ciclos = this.ciclos.slice(0, 5);
      }
    );
  }

  ngOnInit(): void {
    //igual pues ni lo necesito
  }

  randomCiclos() {
    let ciclosRandom: number[] = [];

    while (ciclosRandom.length < 5) {
      let randomIndex = Math.floor(Math.random() * this.ciclosLength);

      if (!ciclosRandom.includes(randomIndex)) {
        ciclosRandom.push(randomIndex);
      }
    }

    console.log("ciclos random: " + ciclosRandom.join(" "));

    return ciclosRandom;
  }


  goTo(id: string): void {
    if (id) {
      // Realiza la redirección o la lógica necesaria con el id
      this.router.navigate(['home/ciclo', id]);
    }
  }







}
