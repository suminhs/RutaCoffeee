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

  user: any = '';
  nombres: string = '';
  apellidos: string = '';
  email: string = '';  

  constructor(
    private dbService: DbserviceService,
    private storage: Storage
  ) {}

  async ngOnInit() {

  this.user = localStorage.getItem('usuarioLogueado');

  if (this.user) {
    this.cargarDatosUsuario(this.user);
    }
  }

  cargarDatosUsuario(usuario: string) {
  this.dbService.getUserByUsuario(usuario).then((data: any) => {
    if (data) {
      this.nombres = data.nombres;
      this.apellidos = data.apellidos;
      this.email = data.email;      
    }
  });
}

  guardarCambios() {
    const datosActualizados = {
      usuario: this.user,
      nombres: this.nombres,
      apellidos: this.apellidos,
      email: this.email      
    };

    this.dbService.actualizarUsuario(datosActualizados)
    .then(() => alert("Datos actualizados correctamente"))
    .catch(() => alert("Error al actualizar"));
    }  

  limpiarCampos() {
    this.nombres = '';
    this.apellidos = '';
    this.email = '';    
  }
}