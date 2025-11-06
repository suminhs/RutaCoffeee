import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CafesPage } from './cafes.page';

const routes: Routes = [
  {
    path: '',
    component: CafesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CafesPageRoutingModule {}
