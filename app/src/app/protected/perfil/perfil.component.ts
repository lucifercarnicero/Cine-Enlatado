import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  user: Usuario | undefined;
  id:string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.id = localStorage.getItem('id')!;
    this.authService.getUsuario(this.id).subscribe(resp => {
      this.user = resp;
    });
  }

  editarPerfil(id: string) {
    this.router.navigate(['dashboard/editar-usuario/${id}']);
  }


  goBack() {
    window.history.back();
  }

}
