import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [

      {
        path: 'posts',
        loadChildren: () =>
          import('../tabs/posts/posts.module').then(m => m.PostsPageModule)
      },
      {
        path: 'noticias',
        loadChildren: () =>
          import('../tabs/noticias/noticias.module').then(m => m.NoticiasPageModule)
      },
      {
        path: 'cafes',
        loadChildren: () =>
          import('../tabs/cafes/cafes.module').then(m => m.CafesPageModule)
      },

      // 👉 ruta por defecto dentro de tabs
      {
        path: '',
        redirectTo: '/tabs/posts',
        pathMatch: 'full'
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}