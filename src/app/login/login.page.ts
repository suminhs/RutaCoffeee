import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {

  usuario: string = '';
  password: string = '';

  constructor(private alertController: AlertController,
              private router: Router
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
  // Verificación de usuario
  const usuarioValido = /^[a-zA-Z0-9]{3,8}$/.test(this.usuario);
  if (!this.usuario) {
    this.mostrarAlerta('El campo de usuario no puede estar vacío.');
    return;
  }

  // Validación de formato en correo
  if (!usuarioValido) {
    this.mostrarAlerta('El usuario debe ser alfanumérico y tener entre 3 y 8 caracteres.');
    return;
  }

  // Verificación de contraseña
  if (!this.password) {
    this.mostrarAlerta('El campo de contraseña no puede estar vacío.');
    return;
  }

  // Verificación de contraseña con 4 números
  if (this.password.length !== 4 || !/^\d{4}$/.test(this.password)) {
    this.mostrarAlerta('La contraseña debe tener 4 números.');
    return;
  }

  this.router.navigate(['/home'], { state: { user:this.usuario }});
}

}
