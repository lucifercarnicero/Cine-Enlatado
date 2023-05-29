import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface MenuItem {
  name: string;
  url: string;
  action?: () => void; // Agregar la propiedad 'action' como una función opcional
}

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public navbarItems: MenuItem[];

  constructor(private router: Router) {
    const username = localStorage.getItem('name');
    if (username) {
      this.navbarItems = [
        { name: 'Home', url: '' },
        { name: 'Listado', url: '../home/list' },
        { name: 'Random', url: '../home/random' },
        { name: 'User: '+username, url: '../dashboard/perfil' },
        { name: 'Logout', url: '../auth/logout' }
      ];
    } else {
      this.navbarItems = [
        { name: 'Home', url: '' },
        { name: 'Listado', url: '../home/list' },
        { name: 'Random Ciclo', url: '../home/random' },
        { name: 'Login', url: '../auth/login' }
      ];
    }
  }

  logout(): void {

    localStorage.clear();
    this.router.navigate(['../home']);
  }

  //añadir que si es admin la redirección de perfil sea a adminpanel o algo así
  //el panel de admin un botón para ver todos los ciclos (y hacer crud) y todos los usuarios (y hacer crud)
}
