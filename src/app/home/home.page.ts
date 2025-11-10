import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(
    private menu: MenuController,
    private router: Router
  ) {}

  closeMenu() {
    this.menu.close();
  }

  cerrarSesion() {
    this.menu.close();
    this.router.navigate(['/login']);
  }
}