import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RankingService } from 'src/app/_services/ranking.service';
import { TrivialService } from 'src/app/_services/trivial.service';
import { Ranking } from 'src/app/interfaces/ranking';

@Component({
  selector: 'app-trivial',
  templateUrl: './trivial.component.html',
  styleUrls: ['./trivial.component.css']
})
export class TrivialComponent implements OnInit {
  preguntas: any[] = [];
  respuestasUsuario: number[] = [];
  preguntasMostradas: any[] = [];
  preguntaActual = 0;
  aciertos = 0;
  finalizado = false;

  constructor(
    private trivialService: TrivialService,
    private router: Router,
    private rankingService: RankingService
  ) {}

  ngOnInit() {
    this.obtenerPreguntas();
  }

  obtenerPreguntas() {
    this.trivialService.getPreguntas().subscribe(
      (preguntas: any[]) => {
        this.preguntas = this.obtenerPreguntasAleatorias(preguntas, 10);
        this.respuestasUsuario = Array(this.preguntas.length).fill(null);
        this.mostrarPreguntas();
      },
      error => {
        console.error(error);
        alert('Hubo un error al obtener las preguntas.');
      }
    );
  }

  obtenerPreguntasAleatorias(preguntas: any[], cantidad: number): any[] {
    const indicesAleatorios: number[] = [];
    const preguntasAleatorias = [];
    const totalPreguntas = preguntas.length;

    while (indicesAleatorios.length < cantidad) {
      const indiceAleatorio = Math.floor(Math.random() * totalPreguntas);
      if (!indicesAleatorios.includes(indiceAleatorio)) {
        indicesAleatorios.push(indiceAleatorio);
        preguntasAleatorias.push(preguntas[indiceAleatorio]);
      }
    }

    return preguntasAleatorias;
  }

  mostrarPreguntas() {
    this.preguntasMostradas = [...this.preguntas];
  }

  siguientePregunta() {
    if (this.preguntaActual < this.preguntasMostradas.length - 1) {
      this.preguntaActual++;
    } else {
      this.finalizado = true;
      this.verificarRespuestas();
    }
  }

  verificarRespuestas() {
    this.aciertos = 0;
    for (let i = 0; i < this.preguntas.length; i++) {
      if (this.respuestasUsuario[i] === this.preguntas[i].respuesta) {
        this.aciertos++;
      }
    }

    const registro: Ranking = {
      aciertos: this.aciertos,
      jugador: localStorage.getItem('name') || ''

    };

    this.rankingService.postRegistro(registro).subscribe(
      response => {
        console.log(response.mensaje);

      },
      error => {
        console.error(error);

      }
    );
  }

  reiniciar() {
    this.preguntaActual = 0;
    this.aciertos = 0;
    this.finalizado = false;
    this.obtenerPreguntas();
  }

  salir() {
    this.router.navigateByUrl('/home');
  }
}
