import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CiclosService } from 'src/app/_services/ciclos.service';
import { Ciclo } from 'src/app/interfaces/ciclo';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.css']
})
export class CicloComponent implements OnInit {

  ciclo?: Ciclo;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ciclosService: CiclosService,
    private location: Location) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')! || '';
    this.ciclosService.getCiclo(id).subscribe(ciclo => {
      if (ciclo) {
        this.ciclo = ciclo;
        console.log(this.ciclo); // Aquí se muestra el producto por consola
      } else {
        // Manejar el caso en que no se encuentra el producto
        this.router.navigate(['/error']);
      }
    } );
  }

  goList(): void {
    this.router.navigate(['/home/list']);
  }

}
