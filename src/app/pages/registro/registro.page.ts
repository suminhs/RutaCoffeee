import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { FormtearFechaPipe } from '../../pipes/formtear-fecha.pipe';
import { DbserviceService } from '../../services/dbservice.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage implements OnInit {

  nombre: string = '';
  apellido: string = '';
  usuario: string = '';
  email: string = '';
  password: string = '';
  selectedDate: string = '';

  constructor(
    private alertController: AlertController,
    private menu: MenuController,
    private formtearFechaPipe: FormtearFechaPipe,
    private dataServices: DbserviceService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.menu.close("mainMenu");
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  guardar() {
    console.log("GUARDAR OK");

    if (!this.nombre.trim() || !this.apellido.trim()) {
      this.presentAlert("Debe ingresar nombre y apellido.");
      return;
    }

    if (this.usuario.trim().length < 3) {
      this.presentAlert("El usuario debe tener al menos 3 caracteres.");
      return;
    }

    if (!/^[a-zA-Z0-9]+$/.test(this.usuario)) {
      this.presentAlert("El usuario solo puede contener letras y números.");
      return;
    }

    if (!this.email.trim()) {
      this.presentAlert('El email es obligatorio.');
      return;
    }

    if (!this.password.trim()) {
      this.presentAlert('La contraseña es obligatoria.');
      return;
    }

    if (!/^\d{4}$/.test(this.password)) {
      this.presentAlert('La contraseña debe ser un número de 4 dígitos.');
      return;
    }

    if (!this.selectedDate) {
      this.presentAlert('Debe seleccionar una fecha de nacimiento.');
      return;
    }

    this.registrar();
  }

  async registrar() {
    console.log("REGISTRAR OK");

    const fechaFormateada = this.formtearFechaPipe.transform(this.selectedDate);

    const success = await this.dataServices.registerUser(
      this.nombre.trim(),
      this.apellido.trim(),
      this.usuario.trim(),
      this.email.trim(),
      this.password.trim(),
      fechaFormateada
    );

    if (success) {
      await this.presentAlert("Registro exitoso. Ahora puedes iniciar sesión.");
      this.navCtrl.navigateForward('/login');
    } else {
      this.presentAlert("Error al registrar. El usuario ya existe o ocurrió un error.");
    }
  }
}
