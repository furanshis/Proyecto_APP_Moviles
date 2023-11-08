import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { NoAuthGuard } from './guards/no-auth.guard';
//import { AuthGuard } from './guards/auth.guard';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard'
import { Tab1Page } from './tab1/tab1.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)//, canActivate:[NoAuthGuard]
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./alumnos/alumnos.module').then( m => m.AlumnosPageModule), 
    ...canActivate(() => redirectUnauthorizedTo(['/tabs/tab1/']))
  },
  {
    path: 'contrasena',
    loadChildren: () => import('./contrasena/contrasena.module').then( m => m.ContrasenaPageModule),
    ...canActivate(() => redirectLoggedInTo(['/tabs/tab2']))
  },
  {
    path: 'codigo',
    loadChildren: () => import('./codigo/codigo.module').then( m => m.CodigoPageModule),
    ...canActivate(() => redirectLoggedInTo(['/tabs/tab2']))
  },
  {
    path: 'tabs/tab1',
    loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule),
    ...canActivate(() => redirectLoggedInTo(['/tabs/tab2']))
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
