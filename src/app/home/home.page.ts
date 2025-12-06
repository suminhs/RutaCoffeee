import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {

  segmentValue: string = 'datos';

  constructor(
    private menu: MenuController,
    private router: Router,
    private navCtrl: NavController
  ) {}

  //  Método para ir a Tabs
  irATabs() {
    this.navCtrl.navigateForward('/tabs');
  }

  //  Cerrar menú lateral
  closeMenu() {
    this.menu.close();
  }

  // Cerrar sesión
  cerrarSesion() {
    this.menu.close();
    localStorage.setItem('usuarioActivo', 'false');
    this.router.navigate(['/login']);
  }
}