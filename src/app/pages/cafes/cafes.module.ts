import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CafesPageRoutingModule } from './cafes-routing.module';
import { CafesPage } from './cafes.page';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CafesPageRoutingModule
  ],
  declarations: [CafesPage]
})
export class CafesPageModule {}
