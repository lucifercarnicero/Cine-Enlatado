import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CiclosService } from 'src/app/_services/ciclos.service';
import { Ciclo } from 'src/app/interfaces/ciclo';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {

  ciclos: Ciclo[] = [];
  selectedCiclo: Ciclo | null = null;

  constructor(
    private ciclosService: CiclosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ciclosService.obtenerCiclos().subscribe(
      data => {
        this.ciclos = data;
        //repesco de inicio lo que hice para obtener los ciclos random
        // Ordenar los ciclos por numLikes de mayor a menor
        this.ciclos.sort((a, b) => (b.numLikes || 0) - (a.numLikes || 0));

        // Obtener solo los cinco primeros ciclos
        this.ciclos = this.ciclos.slice(0, 5);

        // Seleccionar aleatoriamente un ciclo del array ordenado
        const randomIndex = Math.floor(Math.random() * this.ciclos.length);
        this.selectedCiclo = this.ciclos[randomIndex];
      },
      error => {
        console.log(error);
      }
    );
  }

  goBack(): void {
    window.history.back();
  }

  otroRandom() {
    const randomIndex = Math.floor(Math.random() * this.ciclos.length);
    this.selectedCiclo = this.ciclos[randomIndex];
  }

  imageError(event: any) {
    event.target.src = '../../assets/images/error.jpg';
  }

  goMovie (id: string) {
    this.router.navigate(['/home/pelicula/'+id]);
  }
}
