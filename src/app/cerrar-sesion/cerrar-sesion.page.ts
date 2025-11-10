import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.page.html',
  styleUrls: ['./cerrar-sesion.page.scss'],
  standalone: false,
})
export class CerrarSesionPage {

  constructor(
    private router: Router,
    private menuCtrl: MenuController
  ) {}

  logout() {
    
    this.menuCtrl.close();

    this.router.navigate(['/login']);
  }
}