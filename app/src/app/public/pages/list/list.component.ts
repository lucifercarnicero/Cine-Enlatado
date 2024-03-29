import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CiclosService } from 'src/app/_services/ciclos.service';
import { Ciclo } from 'src/app/interfaces/ciclo';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  ciclos: Ciclo[] = [];
  filtroNombre = '';
  originalCiclos: Ciclo[] = [];
  mostrarAlerta = false;
  currentPage = 1;
  itemsPerPage = 8;
  mostrarMisFavoritos = false;



  constructor(private ciclosService: CiclosService, private router: Router) {}

  ngOnInit(): void {
    this.todosCiclos();
  }

  todosCiclos() {
    this.ciclosService.obtenerCiclos().subscribe(
      (ciclos) => {
        this.ciclos = ciclos;
        this.originalCiclos = ciclos;
        console.log(this.ciclos);
      },
      (error) => console.log(error)
    );
  }

  showCiclo(id: string) {
    console.log(id);

  }

  goCiclo(id: string) {
    this.router.navigate(['/home/ciclo', id]);
  }

  goCreate() {
    this.router.navigate(['/dashboard/crear']);
  }

  filtrarCiclos() {
    if (this.filtroNombre.trim() !== '') {
      const filtro = this.filtroNombre.toLowerCase();
      this.ciclos = this.originalCiclos.filter((ciclo) =>
        ciclo.nombre.toLowerCase().includes(filtro)
      );
    } else {
      this.ciclos = this.originalCiclos; // Si no hay filtro, mostrar todos los ciclos
    }

    this.mostrarAlerta = this.ciclos.length === 0; // Modifica la propiedad mostrarAlerta si no hay resultados

    // Resetear la paginación
    this.currentPage = 1;
  }

  limpiarBusqueda() {
    this.filtroNombre = '';
    this.ciclos = this.originalCiclos; // Ver todos ciclos otra vez
    this.mostrarAlerta = false; // Oculta la alerta de no hay resultados
    this.currentPage = 1; // Reset paginas
  }

  getTotalPages(): number {
    return Math.ceil(this.ciclos.length / this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  getCiclosForPage(): Ciclo[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.ciclos.slice(startIndex, endIndex);
  }

  getPaginationArray(): number[] {
    return Array.from({ length: this.getTotalPages() }, (_, index) => index + 1);
  }

  misFavoritos() {
    const userId = localStorage.getItem("id");

    if (!userId) {
      return; // Si no se encuentra la id del usuario, no se realiza la filtración
    }

    this.ciclos = this.originalCiclos.filter((ciclo) =>
      ciclo.likes?.some((like) => like.usuario === userId)
    );

    // Restablecer otras variables y propiedades según sea necesario
    this.filtroNombre = ''; // Restablecer el filtro de nombre
    this.mostrarAlerta = false; // Restablecer la alerta
    this.currentPage = 1; // Restablecer la paginación
  }

  cambiarVista() {
    this.mostrarMisFavoritos = !this.mostrarMisFavoritos;

    if (this.mostrarMisFavoritos) {
      this.misFavoritos();
    } else {
      this.todosCiclos();
    }
  }

  misCiclos() {
    this.router.navigate(['/dashboard/mis-ciclos']);
  }
}
