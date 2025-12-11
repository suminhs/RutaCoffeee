import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  constructor(
    private menu: MenuController,
    private router: Router
  ) {}

  closeMenu() {
    this.menu.close();
  }

  cerrarSesion() {
    this.menu.close();
    localStorage.removeItem('usuarioActivo');
    this.router.navigate(['/login']);
  }
}
