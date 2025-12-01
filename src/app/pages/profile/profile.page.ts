import { Component, OnInit } from '@angular/core';
import { DbserviceService } from '../../services/dbservice.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  user: any = ''; // usuario logueado

  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  fechaNacimiento: any = '';

  constructor(
    private dbService: DbserviceService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();

    // 1) Obtener usuario logueado desde Storage
    this.user = await this.storage.get('usuarioLogueado');

    if (this.user) {
      // 2) Buscar sus datos en la BD
      this.cargarDatosUsuario(this.user);
    }
  }

  cargarDatosUsuario(usuario: string) {
    this.dbService.getUserByUsuario(usuario).then((data: any) => {
      if (data) {
        this.nombre = data.nombre;
        this.correo = data.correo;
        this.telefono = data.telefono;
        this.fechaNacimiento = data.fechaNacimiento;
      }
    });
  }

  guardarCambios() {
    const datosActualizados = {
      usuario: this.user,
      nombre: this.nombre,
      correo: this.correo,
      telefono: this.telefono,
      fechaNacimiento: this.fechaNacimiento
    };

    this.dbService.actualizarUsuario(datosActualizados).then(() => {
      alert("Datos actualizados correctamente");
    });
  }

  limpiarCampos() {
    this.nombre = '';
    this.correo = '';
    this.telefono = '';
    this.fechaNacimiento = '';
  }
}