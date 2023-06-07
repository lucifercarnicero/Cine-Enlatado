import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CiclosService } from 'src/app/_services/ciclos.service';
import { Ciclo } from 'src/app/interfaces/ciclo';

@Component({
  selector: 'app-editar-ciclo',
  templateUrl: './editar-ciclo.component.html',
  styleUrls: ['./editar-ciclo.component.css']
})
export class EditarCicloComponent implements OnInit{

  ciclo: Ciclo | undefined;

  constructor(
    private ciclosService: CiclosService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')! || '';
    this.ciclosService.getCiclo(id).subscribe((ciclo) => {
      if (ciclo) {
        this.ciclo = ciclo;
        console.log(this.ciclo); // Aquí se muestra el producto por consola

        // Verificar si el usuario está en el array de likes
      } else {
        // Manejar el caso en que no se encuentra el producto
        this.router.navigate(['/error']);
      }
    });
  }



}
