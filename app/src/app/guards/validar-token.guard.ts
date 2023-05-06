import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private authService:AuthService,
    private router:Router) {}

  canActivate(): Observable<boolean> | boolean  {
    console.log('canActivate');
    return this.authService.validarToken()
      .pipe(
        tap( valid => {
          if(!valid){
            this.router.navigateByUrl('/auth');
          }
        }
        )
      )
  }

  canLoad() : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('canLoad')
    return this.authService.validarToken()
    .pipe(
      tap( valid => {
        if(!valid){
          this.router.navigateByUrl('/auth');
        }
      }
      )
    )
  }
}
