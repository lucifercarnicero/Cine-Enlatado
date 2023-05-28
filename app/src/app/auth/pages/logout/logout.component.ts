import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent {

  constructor(private router: Router) {
    // Realiza la lógica de logout aquí
    // Por ejemplo, limpiar los datos del usuario en localStorage y redirigir al usuario a la página de inicio

    localStorage.clear();
    this.router.navigate(['/']);
  }

}
