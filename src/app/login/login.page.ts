import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

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
    private navCtrl: NavController
  ) { }

  // Método para mostrar alerta de error
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  login() {
    // Validación de usuario
    const usuarioValido = /^[a-zA-Z0-9]{3,8}$/.test(this.usuario);

    if (!this.usuario) {
      this.mostrarAlerta('El campo de usuario no puede estar vacío.');
      return;
    }

    if (!usuarioValido) {
      this.mostrarAlerta('El usuario debe ser alfanumérico y tener entre 3 y 8 caracteres.');
      return;
    }

    // Validación de contraseña
    if (!this.password) {
      this.mostrarAlerta('El campo de contraseña no puede estar vacío.');
      return;
    }

    if (this.password.length !== 4 || !/^\d{4}$/.test(this.password)) {
      this.mostrarAlerta('La contraseña debe tener 4 números.');
      return;
    }

    //  Guardar usuario logueado en localStorage
    localStorage.setItem('usuario', this.usuario);

    // Navegar a la página de perfil, pasando el usuario como string
    this.navCtrl.navigateForward('/home', {
      state: { user: this.usuario }
    });
  }
}