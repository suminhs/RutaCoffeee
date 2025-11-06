import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CafesPageRoutingModule } from './cafes-routing.module';

import { CafesPage } from './cafes.page';

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
