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
  ) {
    // Obtener el usuario desde la navegación o localStorage
    const nav = this.router.getCurrentNavigation();
    this.user = nav?.extras?.state?.['user'] || localStorage.getItem('usuario') || 'Invitado';
  }

  ngOnInit() {
    // Recuperar el usuario actual desde localStorage
    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
      this.user = usuarioGuardado;

      // Buscar si ya hay datos guardados del perfil
      const perfilGuardado = localStorage.getItem(`perfil_${this.user}`);
      if (perfilGuardado) {
        const datos = JSON.parse(perfilGuardado);
        this.nombre = datos.nombre || '';
        this.correo = datos.correo || '';
        this.telefono = datos.telefono || '';
        this.fechaNacimiento = datos.fechaNacimiento ? new Date(datos.fechaNacimiento) : null;
      }
    } else {
      this.user = 'Invitado';
    }
  }

  // Limpiar todos los campos del perfil
limpiarCampos() {
  this.nombre = '';
  this.correo = '';
  this.telefono = '';
  this.fechaNacimiento = null;

  // Eliminar también del localStorage si se desea limpiar guardado
  if (this.user && this.user !== 'Invitado') {
    localStorage.removeItem(`perfil_${this.user}`);
  }

  // Mostrar mensaje de confirmación
  this.toastController.create({
    message: 'Campos del perfil limpiados.',
    duration: 2000,
    color: 'medium'
  }).then(toast => toast.present());
}

  //  Guardar los cambios del perfil
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
      fechaNacimiento: this.fechaNacimiento ? this.fechaNacimiento.toISOString() : null,
    };

    // Guardar perfil usando el usuario como clave
    localStorage.setItem(`perfil_${this.user}`, JSON.stringify(datosPerfil));

    const toast = await this.toastController.create({
      message: 'Cambios guardados correctamente.',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }
}