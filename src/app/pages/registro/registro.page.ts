import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular'; 
import { AlertController } from '@ionic/angular';
import { FormtearFechaPipe } from '../../pipes/formtear-fecha.pipe';
import { DbserviceService } from '../../services/dbservice.service'



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone:false,
})
export class RegistroPage implements OnInit {

  nombre: any='';
  apellido: any=''; 
  usuario: any='';
  password: any='';
  selectedDate: any='';    
  registroStatus: string='';

  constructor(private alertController: AlertController, 
              private menu: MenuController,
              private formtearFechaPipe: FormtearFechaPipe,
              private dataServices: DbserviceService ) { }

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

    const fechaFormateada = this.formtearFechaPipe.transform(this.selectedDate);

    if (this.nombre.trim() === '' || this.apellido.trim() === '') {
      this.presentAlert('Error: nombre y apellido vacios');
    } else {
      //this.presentAlert('Datos Correctos  usuario:  '+this.nombre+' fecha nacimiento: '+fechaFormateada);  //
      this.registrar();
    }
  }

  async registrar() {
    const success = await this.dataServices.registerUser(
      this.nombre,
      this.apellido,
      this.usuario,
      this.password,      
      this.selectedDate
    );
    this.registroStatus = success ? 'Registro exitoso' : 'Error al registrar';
    this.presentAlert(this.registroStatus);

  }
}


