import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
   },  
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule),
      canActivate: [AuthGuard] 
  },  
  {
    path: 'registro',
    loadChildren: () =>
      import('./pages/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
      canActivate: [AuthGuard]
  },
  {
    path: 'contactanos',
    loadChildren: () =>
      import('./pages/contactanos/contactanos.module').then(m => m.ContactanosPageModule),
      canActivate: [AuthGuard]
  },  
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then(m => m.TabsPageModule),
      canActivate: [AuthGuard]
  },  
  {
    path: '**',
    loadChildren: () =>
      import('./not-found/not-found.module').then(m => m.NotFoundPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
