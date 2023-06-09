import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CiclosService } from 'src/app/_services/ciclos.service';
import { Ciclo, Pelicula } from 'src/app/interfaces/ciclo';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ciclos-user',
  templateUrl: './ciclos-user.component.html',
  styleUrls: ['./ciclos-user.component.css']
})
export class CiclosUserComponent implements OnInit {
  ciclos: Ciclo[] = [];
  paginatedCiclos: Ciclo[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPagesArray: number[] = [];
  editingState: { [cicloId: string]: boolean } = {}; // Estado de edición por ciclo
  peliculasSeleccionadas: Pelicula[] = [];

  constructor(
    private ciclosService: CiclosService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = localStorage.getItem('id') || '';
      this.ciclosService.getCiclosAutor(id).subscribe((ciclos) => {
        this.ciclos = ciclos;
        this.updatePagination();
      });
    });
  }

  borrar(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar el ciclo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.ciclosService.eliminarCiclo(id).subscribe((response) => {
          this.ciclos = this.ciclos.filter((ciclo) => ciclo._id !== id);
          this.updatePagination();
        });

        Swal.fire({
          title: 'Borrado',
          text: 'El ciclo ha sido borrado',
          icon: 'success',
          heightAuto: false, // Agrega esta línea para desactivar el heightAuto


        });

      }
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedCiclos = this.ciclos.slice(startIndex, startIndex + this.pageSize);
    this.generateTotalPagesArray();
  }

  generateTotalPagesArray() {
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  get totalPages(): number {
    return Math.ceil(this.ciclos.length / this.pageSize);
  }

  goCreate() {
    this.router.navigate(['/dashboard/crear']);
  }

  goBack(): void {
    this.router.navigateByUrl('/home/list');
  }

  editar(cicloId: string) {
    this.router.navigate(['/dashboard/editar/'+cicloId]);
  }

  editarOld(cicloId: string) {
    // Encuentra el objeto ciclo correspondiente por su ID
    const ciclo = this.ciclos.find((c) => c._id === cicloId);
    console.log(ciclo);

    if (ciclo) {
      // Cambia el estado de edición del ciclo
      this.editingState[cicloId] = !this.editingState[cicloId];

      // Copiar las películas del ciclo en el array de películas seleccionadas
      this.peliculasSeleccionadas = ciclo.peliculas ? [...ciclo.peliculas] : [];
    }
  }

  guardarFormulario(ciclo: Ciclo) {
    const dataToSave: Ciclo = {
      ...ciclo,
      peliculas: this.peliculasSeleccionadas
    };

    alert(JSON.stringify(dataToSave));
    console.log(this.peliculasSeleccionadas);
    // Realizar la operación de guardado utilizando el objeto `dataToSave`
  }

  togglePelicula(pelicula: Pelicula) {
    const peliculaIndex = this.peliculasSeleccionadas.findIndex((p) => p.idExterno === pelicula.idExterno);

    if (peliculaIndex !== -1) {
      this.peliculasSeleccionadas.splice(peliculaIndex, 1);
    } else {
      this.peliculasSeleccionadas.push(pelicula);
    }
  }

  isPeliculaSeleccionada(pelicula: Pelicula) {
    return this.peliculasSeleccionadas.some((p) => p.idExterno === pelicula.idExterno);
  }
}
