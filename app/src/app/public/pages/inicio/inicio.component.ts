import { Component, OnInit } from '@angular/core';
import { CiclosService } from 'src/app/_services/ciclos.service';
import { Ciclo } from 'src/app/interfaces/ciclo';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  ciclos: Ciclo[] = [];
  ciclosLength: number = 0;
  ciclosRandom: number[] = [];

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


  /*
  1.Coger id del ciclo,
  2. Hacer una petición a la API para obtener el ciclo con ese id
  3. Mostrar datos películas
  4. La primera de cada ciclo obtener de API movies la info en concreto la imagen
  5. Mostrar imagen
  */

}
