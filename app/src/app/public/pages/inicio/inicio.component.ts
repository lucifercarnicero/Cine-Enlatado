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
        this.idExternos = this.getFirstMovie(); // Obtener los idExterno de las primeras películas

        // Llamar a la función para obtener información adicional de las películas utilizando los idExternos
        this.getMovieInformation(this.idExternos);
        console.log('getMovieInformation() llamado con idExternos:', this.idExternos);
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

  getFirstMovie() {
    const idExternos: string[] = [];

    for (let i = 0; i < 3; i++) {
      const ciclo = this.ciclos[this.ciclosRandom[i]];
      if (ciclo && ciclo.peliculas && ciclo.peliculas.length > 0) {
        const primeraPelicula = ciclo.peliculas[0];
        const idExterno = primeraPelicula.idExterno;
        if (idExterno) {
          idExternos.push(idExterno);
        }
      }
    }

    return idExternos;
  }

  getMovieInformation(idExternos: string[]) {
    // Aquí puedes llamar a la API para obtener información adicional de las películas utilizando los idExternos
    // Puedes implementar la lógica para realizar las solicitudes a la API y mostrar la información en tu componente
  }

  /*
  1.Coger id del ciclo,
  2. Hacer una petición a la API para obtener el ciclo con ese id
  3. Mostrar datos películas
  4. La primera de cada ciclo obtener de
*/

}
