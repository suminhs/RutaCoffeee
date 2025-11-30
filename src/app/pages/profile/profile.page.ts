import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  user: string = '';
  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  fechaNacimiento: Date | null = null;

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    // Los datos no se guardan al cambiar de página o recargar
  }

  // Limpiar todos los campos del perfil
  async limpiarCampos() {
    this.nombre = '';
    this.correo = '';
    this.telefono = '';
    this.fechaNacimiento = null;

    const toast = await this.toastController.create({
      message: 'Campos del perfil limpiados.',
      duration: 2000,
      color: 'medium',
    });
    toast.present();
  }

  // Guardar los cambios del perfil
  async guardarCambios() {
    if (!this.user || this.user === 'Invitado') {
      const alerta = await this.toastController.create({
        message: 'Debes iniciar sesión para guardar cambios.',
        duration: 2000,
        color: 'warning',
      });
      alerta.present();
      return;
    }

    const datosPerfil = {
      nombre: this.nombre,
      correo: this.correo,
      telefono: this.telefono,
      fechaNacimiento: this.fechaNacimiento,
    };

    console.log('Datos temporales:', datosPerfil);

    const toast = await this.toastController.create({
      message: 'Cambios guardados correctamente.',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }
}