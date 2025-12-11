import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {

    const sesionActiva = localStorage.getItem('usuarioActivo') === 'true';

    // Si NO hay sesion → redirigir al login
    if (!sesionActiva) {
      return this.router.parseUrl('/login');
    }

    return true;
  }
}

