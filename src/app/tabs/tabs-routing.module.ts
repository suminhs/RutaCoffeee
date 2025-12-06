import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'posts',
        loadChildren: () =>
          import('./posts/posts.module').then(m => m.PostsPageModule)
      },
      {
        path: 'noticias',
        loadChildren: () =>
          import('./noticias/noticias.module').then(m => m.NoticiasPageModule)
      },
      {
        path: 'cafes',
        loadChildren: () =>
          import('./cafes/cafes.module').then(m => m.CafesPageModule)
      },

      // Tab por defecto
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}