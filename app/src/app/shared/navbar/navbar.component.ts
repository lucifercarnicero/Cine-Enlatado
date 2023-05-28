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
        { name: 'Logout', url: '../auth/logout' } // Agregar la función logout en la propiedad "action"
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
    // Realiza la lógica de logout aquí
    // Por ejemplo, limpiar los datos del usuario en localStorage y redirigir al usuario a la página de login
    localStorage.clear();
    this.router.navigate(['../home']);
  }
}
