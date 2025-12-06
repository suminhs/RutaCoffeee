import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'cafes',
        loadChildren: () => import('../tabs/cafes/cafes.module').then(m => m.CafesPageModule)
      },
      {
        path: 'noticias',
        loadChildren: () => import('../tabs/noticias/noticias.module').then(m => m.NoticiasPageModule)
      },
      {
        path: 'posts',
        loadChildren: () => import('../tabs/posts/posts.module').then(m => m.PostsPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
