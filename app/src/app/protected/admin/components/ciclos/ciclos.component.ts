import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs';
import { CiclosService } from 'src/app/_services/ciclos.service';
import { Ciclo } from 'src/app/interfaces/ciclo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ciclos',
  templateUrl: './ciclos.component.html',
  styleUrls: ['./ciclos.component.css']
})
export class CiclosComponent implements OnInit {

  ciclos: Ciclo[] = [];

  constructor(
    private ciclosService: CiclosService,
    private http: HttpClient
  ) {

   }

  ngOnInit(): void {
   this.ciclosService.obtenerCiclos().subscribe(ciclos => {
      this.ciclos = ciclos;
      console.log(this.ciclos);
    } );
  }

  borrar(id: string){
    console.log(id);

    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás recuperar el ciclo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ciclosService.eliminarCiclo(id).subscribe(response => {
          console.log(response);
          this.ciclos = this.ciclos.filter(ciclo => ciclo._id !== id);
        });

        Swal.fire(
          'Borrado',
          'El ciclo ha sido borrado',
          'success'
        )
      }
    }
    )

  }



}
