import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

// IMPORTA TUS COMPONENTES
import { MisDatosComponent } from '../components/mis-datos/mis-datos.component';
import { ExperienciaLaboralComponent } from '../components/experiencia-laboral/experiencia-laboral.component';
import { CertificacionesComponent } from '../components/certificaciones/certificaciones.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    MisDatosComponent,
    ExperienciaLaboralComponent,
    CertificacionesComponent
  ]
})
export class HomePageModule {}