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
  isLiked: boolean = false;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ciclosService: CiclosService,
    private location: Location) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')! || '';
    this.ciclosService.getCiclo(id).subscribe((ciclo) => {
      if (ciclo) {
        this.ciclo = ciclo;
        console.log(this.ciclo); // Aquí se muestra el producto por consola

        // Verificar si el usuario está en el array de likes
        const usuarioId = localStorage.getItem('id');
        this.isLiked = this.ciclo.likes?.some((like) => like.usuario === usuarioId) ?? false;
      } else {
        // Manejar el caso en que no se encuentra el producto
        this.router.navigate(['/error']);
      }
    });
  }

  goBack(): void {
    this.location.back(); // Navegar a la página anterior
  }

  like() {
    const usuarioId = localStorage.getItem('id'); // Obtener la ID del usuario activo del localStorage
    const idCiclo = this.ciclo?._id!; // Obtener la ID del ciclo actual

    if(!usuarioId || !idCiclo) return; // Si no hay usuario o ciclo, no hacer nada

    if (this.ciclo?.likes?.some((like) => like.usuario === usuarioId)) {
      // La ID del usuario activo ya existe en this.ciclo.likes
      this.ciclosService.dislikeCiclo(idCiclo, usuarioId!).subscribe((response) => {
        console.log(response);
        if (response.ciclo) {
          this.ciclo = response.ciclo; // Actualizar el ciclo con los datos actualizados
          this.isLiked = false; // Actualizar el estado del botón
        }
      });

    } else {
      this.ciclosService.likeCiclo(idCiclo, usuarioId!).subscribe((response) => {
        console.log(response);
        if (response.ciclo) {
          this.ciclo = response.ciclo; // Actualizar el ciclo con los datos actualizados
          this.isLiked = true; // Actualizar el estado del botón
        }
      });
    }
  }

  imageError(event: any) {
    event.target.src = '../../assets/images/error.jpg';
  }


  goMovie (id: string) {
    this.router.navigate(['/home/pelicula/'+id]);
  }


}
