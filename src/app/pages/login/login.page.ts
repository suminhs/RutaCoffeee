import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DbserviceService } from '../../services/dbservice.service'


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
    private dataServices: DbserviceService) { }

  // Mostrar alerta de error
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

    if (!this.usuario) {
      this.mostrarAlerta('El campo de usuario no puede estar vacío.');
      return;
    }

    if (!this.validarlogin()) {
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

    //  Si todas las validaciones son correctas
    localStorage.setItem('usuarioActivo', 'true');
      

  // Validación con el servicio de autenticación
  const isAuthenticated = await this.dataServices.loginUser(this.usuario, this.password);

  if (isAuthenticated) {    

    // Guardar el nombre del usuario en Local Storage
     localStorage.setItem('username', this.usuario);
     localStorage.setItem('usuarioActivo', 'true'); 

    // Navegar a la página de perfil, pasando el usuario como string
    this.navCtrl.navigateForward('/home', {
      queryParams: { user: this.usuario }
    });   
    } else {
      await this.mostrarAlerta('Usuario o contraseña incorrectos.');
    }
  }

    registro()
  {
    this.navCtrl.navigateForward(['/registro']);
  }
}