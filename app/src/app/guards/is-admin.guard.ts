import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAdmin = localStorage.getItem('esAdmin');

    if (isAdmin === 'true') {
      return true; // Permite el acceso a la ruta protegida
    } else {
      this.router.navigate(['dashboard/perfil']); // Redirige a otra ruta si no tiene isAdmin en true
      return false; // Bloquea el acceso a la ruta protegida
    }
  }

}
