import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {  

  segmentValue: string = 'datos';

  // Variables de geolocalización
  latitud: number = 0;
  longitud: number = 0;
  mapUrl: string = '';

  constructor(
    private menu: MenuController,
    private router: Router,
    private navCtrl: NavController
  ) {}

  async ionViewDidEnter() {
    await this.obtenerUbicacion();
  }

  async obtenerUbicacion() {
    try {
      const position = await Geolocation.getCurrentPosition();

      this.latitud = position.coords.latitude;
      this.longitud = position.coords.longitude;

      // Mapa
      this.mapUrl = `https://maps.google.com/maps?q=${this.latitud},${this.longitud}&z=15&output=embed`;

    } catch (error) {
      console.error('Error al obtener ubicación:', error);
    }
  }

  openMenu() {
    this.menu.open();
  }

  closeMenu() {
    this.menu.close();
  }

  irPerfil() {
    this.closeMenu();
    this.router.navigate(['/profile']);
  }

  irContactanos() {
    this.closeMenu();
    this.router.navigate(['/contactanos']);
  }

  irATabs() {
    this.navCtrl.navigateForward('/tabs');
  }

  cerrarSesion() {
    this.closeMenu();
    localStorage.removeItem('usuarioActivo');
    this.router.navigate(['/login']);
  }
}