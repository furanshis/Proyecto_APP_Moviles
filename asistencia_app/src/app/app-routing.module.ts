import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { NoAuthGuard } from './guards/no-auth.guard';
//import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)//, canActivate:[NoAuthGuard]
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./alumnos/alumnos.module').then( m => m.AlumnosPageModule)//, canActivate:[AuthGuard]
  },
  {
    path: 'contrasena',
    loadChildren: () => import('./contrasena/contrasena.module').then( m => m.ContrasenaPageModule)
  },
  {
    path: 'codigo',
    loadChildren: () => import('./codigo/codigo.module').then( m => m.CodigoPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
