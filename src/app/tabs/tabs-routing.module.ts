import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
       {
          path: 'create-post',
          loadChildren: () => import('./create-post/create-post.module').then( m => m.CreatePostPageModule)
        },
        {
          path: 'posts',
          loadChildren: () => import('./posts/posts.module').then( m => m.PostsPageModule)
        },         
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
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}