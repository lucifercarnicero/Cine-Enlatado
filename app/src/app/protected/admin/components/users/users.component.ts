import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/auth/interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Usuario[] = [];
  paginatedUsers: Usuario[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPagesArray: number[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUsers().subscribe(users => {
      this.users = users;
      this.updatePagination();
    });
  }

  borrar(id: string) {
    console.log(id);
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás recuperar el usuario",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.eliminar(id).subscribe(response => {
          console.log(response);
          this.users = this.users.filter(user => user._id !== id);
          this.updatePagination();
        });

        Swal.fire({
          title: 'Borrado',
          text: 'El usuario ha sido borrado',
          icon: 'success',
          timer: 3000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          customClass: {
            popup: 'swal2-popup-highauto'
          },
          heightAuto: false
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
    this.paginatedUsers = this.users.slice(startIndex, startIndex + this.pageSize);
    this.generateTotalPagesArray();
  }

  generateTotalPagesArray() {
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  get totalPages(): number {
    return Math.ceil(this.users.length / this.pageSize);
  }
}
