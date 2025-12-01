import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DbserviceService } from '../../services/dbservice.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {

  usuario: string = '';
  password: string = '';

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private dataServices: DbserviceService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create(); // Inicializa Storage
  }

  // Alerta simple
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Validación de usuario
  validarlogin() {
    const usuarioRegex = /^[a-zA-Z0-9]{3,8}$/;
    return usuarioRegex.test(this.usuario);
  }

  async login() {

    // Validaciones
    if (!this.usuario) {
      this.mostrarAlerta('El campo de usuario no puede estar vacío.');
      return;
    }

    if (!this.validarlogin()) {
      this.mostrarAlerta('El usuario debe ser alfanumérico y tener entre 3 y 8 caracteres.');
      return;
    }

    if (!this.password) {
      this.mostrarAlerta('El campo de contraseña no puede estar vacío.');
      return;
    }

    if (!/^\d{4}$/.test(this.password)) {
      this.mostrarAlerta('La contraseña debe tener 4 números.');
      return;
    }

    // Validación con SQLite
    const isAuthenticated = await this.dataServices.loginUser(this.usuario, this.password);

    if (isAuthenticated) {

      // ⭐ Guardamos al usuario logueado
      await this.storage.set('usuarioLogueado', this.usuario);

      // ⭐ Redirigimos al HOME (NO al profile)
      this.navCtrl.navigateRoot('/home');

    } else {
      this.mostrarAlerta('Usuario o contraseña incorrectos.');
    }
  }

  registro() {
    this.navCtrl.navigateForward(['/registro']);
  }
}