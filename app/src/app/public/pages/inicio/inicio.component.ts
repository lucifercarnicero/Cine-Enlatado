import { Component, OnInit } from '@angular/core';
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

  ) {
    this.ciclosService.obtenerCiclos().subscribe(
      data => {
        console.log(data);
        this.ciclos = data;
        this.ciclosLength = data.length; // Asignar la longitud de los ciclos

        this.ciclosRandom = this.randomCiclos(); // Llamar a randomCiclos() después de recibir los ciclos



      }
    );
  }

  ngOnInit(): void {
    //igual pues ni lo necesito
  }

  randomCiclos() {
    let ciclosRandom: number[] = [];

    while (ciclosRandom.length < 3) {
      let randomIndex = Math.floor(Math.random() * this.ciclosLength);

      if (!ciclosRandom.includes(randomIndex)) {
        ciclosRandom.push(randomIndex);
      }
    }

    console.log("ciclos random: " + ciclosRandom.join(" "));

    return ciclosRandom;
  }










}
